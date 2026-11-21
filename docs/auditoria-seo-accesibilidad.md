# Auditoría del portfolio de Marlon Chaviano

20 de noviembre de 2026 · Compilación local de producción · Español e inglés

## Resultados

| Comprobación | Alcance | Resultado |
| --- | --- | --- |
| Rastreo | 32 páginas, incluidos los nueve casos de estudio en ambos idiomas | Todas respondieron con HTTP 200, un H1, idioma correcto y título y descripción propios |
| Indexabilidad | Sitemap y metadatos de las 32 páginas | 30 URLs previstas para indexación. El artículo de muestra sigue disponible en ambos idiomas con `noindex, follow` |
| Idiomas y autoría | HTML renderizado y datos estructurados | Canónicas propias, alternativas recíprocas en inglés y español y alternativa por defecto. Las referencias al autor apuntan a una misma persona |
| Enlaces | 34 destinos internos y siete enlaces externos de las tarjetas de trabajo | Todos respondieron con HTTP 200. Tres rutas inexistentes de prueba devolvieron HTTP 404 y `noindex` |
| Vista previa social | HTML entregado al agente de Twitter y los dos archivos de imagen | Título e imagen disponibles en el HTML inicial de las 32 páginas. Ambas imágenes respondieron como PNG de 1200 × 630 |
| Accesibilidad automática | axe-core 4.14, reglas WCAG A y AA hasta 2.2 y buenas prácticas | Cero infracciones detectadas en 128 comprobaciones finales. Cada URL se probó en escritorio claro a 1280 px y móvil oscuro a 390 px, con movimiento normal y reducido |
| Reflujo | Siete vistas representativas, incluido un caso móvil | Sin desbordamiento horizontal del documento a 320 px |
| Compilación | Compilación de producción, TypeScript y ESLint | Correctos |

## Marca personal y buscadores

Los títulos de los casos de estudio ahora identifican el producto, el tipo de página y a Marlon Chaviano. Antes, algunos repetían toda la descripción y llegaban a 144 caracteres. La portada en español presenta la profesión en español. Los proyectos conservan su explicación en la descripción y el contenido. [Guía de Google sobre títulos](https://developers.google.com/search/docs/appearance/title-link)

El perfil de autor enlaza el retrato, la página «Sobre mí» y los perfiles públicos de GitHub, X y LeetCode. Los artículos enlazan la página del autor. La nueva tarjeta social muestra el nombre, el retrato, Villa Clara y la profesión en el idioma del enlace. Se genera en `/es/opengraph-image` y `/en/opengraph-image`. [Guía de Google sobre perfiles](https://developers.google.com/search/docs/appearance/structured-data/profile-page)

La raíz respeta las preferencias de idioma del navegador, incluso cuando incluyen distintos pesos. La respuesta informa a las cachés de que depende de esa cabecera. Las páginas de las vistas previas de Vercel llevan la directiva de exclusión de los buscadores.

## Accesibilidad e interacción

La primera pasada con movimiento reducido encontró avisos en 36 de 64 combinaciones. Se corrigieron los nombres accesibles del buscador y de los enlaces de actividad, y los nombres duplicados de las regiones de navegación en Contacto. Al probar con animaciones se detectó también que algunos textos perdían contraste durante el desplazamiento o la entrada. Se conservó el movimiento de los elementos y se corrigió el contraste en Inicio, Trabajo, el artículo y la trayectoria.

Se probaron con teclado el salto al contenido, el menú móvil, la búsqueda y selección de proyectos, los filtros de Trabajo, las pestañas de Biblioteca, el visor de capturas y la validación del formulario vacío. Escape cierra los diálogos y devuelve el foco. El carrusel de herramientas permite mantener la pausa y el atajo de sonido requiere Ctrl+Mayús+M. La portada entrega el nombre y los enlaces a proyectos incluso con JavaScript desactivado.

Queda pendiente una sesión con lectores de pantalla reales, especialmente VoiceOver en iPhone y NVDA en Windows. Las pruebas automáticas y de teclado cubren solo parte de la experiencia. [W3C sobre el alcance de las herramientas](https://www.w3.org/WAI/test-evaluate/tools/selecting/)

## Rendimiento

Lighthouse 13.6, en la portada en español con simulación móvil, dio **100 en SEO, 100 en accesibilidad, 100 en buenas prácticas y 88 en rendimiento**. Se excluyó la prueba de caché de avance y retroceso porque Chromium se cerró durante esa comprobación.

El elemento principal de carga fue la captura de Grialink. Ahora el navegador solicita el tamaño apropiado para la pantalla y da prioridad a la primera captura web. Los vídeos en segundo plano esperan su turno para cargar. El tiempo simulado de aparición del contenido principal (LCP) pasó de 4,4 a 3,9 segundos entre las mediciones previas y posteriores a estos ajustes. El desplazamiento acumulado del contenido (CLS) fue 0 y el tiempo total de bloqueo fue 20 ms en la medición final.

## Al publicar

1. Configurar el origen HTTPS definitivo en `NEXT_PUBLIC_SITE_URL` antes de compilar. Verificar en el dominio público la canónica, el sitemap, las dos tarjetas y la redirección a la versión preferida del dominio.
2. Verificar el dominio en Google Search Console, enviar `/sitemap.xml` e inspeccionar la portada, «Sobre mí» y un caso de estudio. Revisar impresiones y clics para «Marlon Chaviano» cuando haya datos.
3. Medir el LCP de visitas móviles reales al percentil 75. El objetivo de referencia es 2,5 segundos o menos. La comprobación en el dominio final permitirá distinguir el tiempo de entrega del servidor, la descarga de la imagen y el renderizado. [Referencia de LCP](https://web.dev/articles/lcp)
