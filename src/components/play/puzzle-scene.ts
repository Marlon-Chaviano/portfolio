import {
  AmbientLight, Color, DirectionalLight, Group, Mesh, MeshStandardMaterial,
  OrthographicCamera, Scene, WebGLRenderer,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { cubicBezier } from "motion";

export type PuzzleScene = { update: (board: number[]) => void; dispose: () => void };

const ease = cubicBezier(0.16, 1, 0.3, 1); // Matches --ease-out.
const positionOf = (position: number) => ({ x: position % 3 - 1, y: 1 - Math.floor(position / 3) });

export function createPuzzleScene(host: HTMLElement, initial: number[], onLost: () => void): PuzzleScene {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0, 0);
  renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
  host.append(renderer.domElement);

  const scene = new Scene();
  const camera = new OrthographicCamera(-2, 2, 2, -2, 0.1, 20);
  camera.position.z = 8;
  const scheme = window.matchMedia("(prefers-color-scheme: dark)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const tileMaterial = new MeshStandardMaterial({ roughness: 0.4, metalness: 0.15 });
  const baseMaterial = new MeshStandardMaterial({ roughness: 0.7, metalness: 0.1 });
  const geometry = new RoundedBoxGeometry(1, 1, 0.28, 3, 0.075);
  const baseGeometry = new RoundedBoxGeometry(3.28, 3.28, 0.18, 3, 0.1);
  const base = new Mesh(baseGeometry, baseMaterial);
  base.position.z = -0.28;
  scene.add(base);
  scene.add(new AmbientLight(0xffffff, 2));
  const light = new DirectionalLight(0xffffff, 4);
  light.position.set(-3, 5, 6);
  scene.add(light);
  const fill = new DirectionalLight(0xffffff, 1);
  fill.position.set(3, -2, 1);
  scene.add(fill);

  const tiles = new Map<number, Group>();
  initial.forEach((tile, position) => {
    if (!tile) return;
    const group = new Group();
    const mesh = new Mesh(geometry, tileMaterial);
    group.add(mesh);
    const point = positionOf(position);
    group.position.set(point.x, point.y, 0);
    tiles.set(tile, group);
    scene.add(group);
  });

  let frame = 0;
  let board = initial;
  let disposed = false;
  const draw = () => { if (!disposed && !document.hidden) renderer.render(scene, camera); };
  const colors = () => {
    tileMaterial.color = new Color(scheme.matches ? "#454545" : "#efefec");
    baseMaterial.color = new Color(scheme.matches ? "#181818" : "#d1d1cc");
    draw();
  };
  const resize = () => {
    const width = host.clientWidth;
    if (!width) return;
    renderer.setSize(width, width, false);
    const scale = 1 - 32 / width;
    tiles.forEach((tile) => tile.children[0].scale.set(scale, scale, 1));
    draw();
  };
  const settle = () => {
    cancelAnimationFrame(frame);
    board.forEach((tile, position) => {
      const point = positionOf(position);
      tiles.get(tile)?.position.set(point.x, point.y, 0);
    });
    draw();
  };
  const visibility = () => { if (document.hidden) cancelAnimationFrame(frame); else settle(); };
  const lost = (event: Event) => {
    event.preventDefault();
    cancelAnimationFrame(frame);
    onLost();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  scheme.addEventListener("change", colors);
  reduced.addEventListener("change", settle);
  document.addEventListener("visibilitychange", visibility);
  renderer.domElement.addEventListener("webglcontextlost", lost);
  colors();
  resize();

  return {
    update(next) {
      board = next;
      cancelAnimationFrame(frame);
      if (reduced.matches || document.hidden) { settle(); return; }
      const starts = new Map([...tiles].map(([tile, group]) => [tile, group.position.clone()]));
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 200, 1);
        const value = ease(progress);
        board.forEach((tile, position) => {
          const group = tiles.get(tile);
          const from = starts.get(tile);
          if (!group || !from) return;
          const to = positionOf(position);
          group.position.set(from.x + (to.x - from.x) * value, from.y + (to.y - from.y) * value, 0);
        });
        draw();
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      scheme.removeEventListener("change", colors);
      reduced.removeEventListener("change", settle);
      document.removeEventListener("visibilitychange", visibility);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      geometry.dispose();
      baseGeometry.dispose();
      tileMaterial.dispose();
      baseMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
