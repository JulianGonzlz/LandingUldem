/* ==========================================================================
   Uldem · Catálogo de productos
   Acá se cargan los rubros y los productos que muestra la sección Productos.
   No lleva precios: cada producto se consulta por WhatsApp.

   Cómo está armado:
   - Cada rubro tiene un nombre, una foto de portada y una carpeta de fotos
     (dentro de assets/products/catalogo/).
   - Un rubro puede tener sus productos sueltos ("productos") o divididos en
     grupos ("grupos"), por ejemplo Línea industrial / Línea profesional.
   - "todos: true" agrega el botón "Todos" para ver todos los grupos juntos
     (se usa en Insumos de ferretería).
   - En cada producto, "foto" es el nombre del archivo dentro de la carpeta
     del rubro (y del grupo, si el grupo tiene "carpeta").
   - "marca" (opcional) hace que el producto aparezca en la página de esa marca
     (marca.html). Se puede poner en un grupo entero (vale para todos sus
     productos) o en un producto suelto (pisa la del grupo). Si es de varias
     marcas, va entre corchetes: marca: ["Gladiator", "Energy"].
   ========================================================================== */

const CATALOGO = [
  {
    id: "herramientas-electricas",
    nombre: "Herramientas eléctricas",
    portada: "assets/products/herramientas-electricas.webp",
    carpeta: "herramientas-electricas",
    grupos: [
      {
        nombre: "Línea industrial",
        carpeta: "linea-industrial",
        marca: "NEO",
        productos: [
          { nombre: "Amoladoras", foto: "amoladoras.jpg" },
          { nombre: "Compresores inteligentes", foto: "compresores-inteligentes.jpg" },
          { nombre: "Herramientas estacionarias", foto: "herramientas-estacionarias.jpg" },
          { nombre: "Lijadoras", foto: "lijadoras.jpg" },
          { nombre: "Martillos demoledores", foto: "martillos-demoledores.jpg" },
          { nombre: "Pulidoras", foto: "pulidoras.jpg" },
          { nombre: "Rotomartillos", foto: "rotomartillos.jpg" },
          { nombre: "Sierras circulares", foto: "sierras-circulares.jpg", marca: "Energy" },
          { nombre: "Sierras sensitivas", foto: "sierras-sensitivas.jpg" },
          { nombre: "Taladros", foto: "taladros.jpg" },
        ],
      },
      {
        nombre: "Línea profesional",
        carpeta: "linea-profesional",
        marca: "Gladiator",
        productos: [
          { nombre: "Amoladoras", foto: "amoladoras.jpg" },
          { nombre: "Aspiradoras", foto: "aspiradoras.jpg" },
          { nombre: "Caladoras", foto: "caladoras.jpg" },
          { nombre: "Compresores", foto: "compresores.jpg" },
          { nombre: "Cortadoras de césped", foto: "cortadoras-de-cesped.jpg" },
          { nombre: "Lijadoras", foto: "lijadoras.jpg" },
          { nombre: "Pulidoras", foto: "pulidoras.jpg" },
          { nombre: "Rotomartillos", foto: "rotomartillos.jpg" },
          { nombre: "Sierras sensitivas", foto: "sierras-sensitivas.jpg" },
          { nombre: "Taladros", foto: "taladros.jpg" },
        ],
      },
    ],
  },
  {
    id: "herramientas-a-bateria",
    nombre: "Herramientas a batería",
    portada: "assets/products/catalogo/herramientas-a-bateria/linea-industrial/taladros.jpg",
    carpeta: "herramientas-a-bateria",
    grupos: [
      {
        nombre: "Línea industrial",
        carpeta: "linea-industrial",
        marca: "NEO",
        productos: [
          { nombre: "Amoladoras", foto: "amoladoras.jpg" },
          { nombre: "Niveles láser", foto: "niveles-laser.jpg" },
          { nombre: "Pistolas de impacto", foto: "pistolas-de-impacto.jpg" },
          { nombre: "Sierras sable", foto: "sierras-sable.jpg" },
          { nombre: "Taladros", foto: "taladros.jpg" },
        ],
      },
      {
        nombre: "Línea profesional",
        carpeta: "linea-profesional",
        marca: "Gladiator",
        productos: [
          { nombre: "Amoladoras", foto: "amoladoras.jpg" },
          { nombre: "Taladros", foto: "taladros.jpg" },
        ],
      },
    ],
  },
  {
    id: "herramientas-de-combustion",
    nombre: "Herramientas de combustión",
    portada: "assets/products/herramientas-combustion.webp",
    carpeta: "herramientas-de-combustion",
    productos: [
      { nombre: "Cortadoras de césped", foto: "cortadoras-de-cesped.jpg", marca: "Gladiator" },
      { nombre: "Desmalezadoras", foto: "desmalezadoras.jpg", marca: ["Gladiator", "Energy"] },
      { nombre: "Generadores", foto: "generadores.jpg", marca: "Gladiator" },
      { nombre: "Hidrolavadoras", foto: "hidrolavadoras.jpg" },
      { nombre: "Motobombas", foto: "motobombas.jpg", marca: "Energy" },
      { nombre: "Motosierras", foto: "motosierras.jpg", marca: ["Gladiator", "Energy"] },
      { nombre: "Tractores cortacésped", foto: "tractores-cortacesped.jpg" },
    ],
  },
  {
    id: "herramientas-de-mano",
    nombre: "Herramientas de mano",
    portada: "assets/products/herramientas-de-mano.webp",
    carpeta: "herramientas-de-mano",
    productos: [
      { nombre: "Alicates", foto: "alicates.jpg", marca: "EMTOP" },
      { nombre: "Arcos de sierra", foto: "arcos-de-sierra.jpg", marca: "EMTOP" },
      { nombre: "Bolsos", foto: "bolsos.jpg", marca: "EMTOP" },
      { nombre: "Cajas de herramientas", foto: "cajas-de-herramientas.jpg", marca: "EMTOP" },
      { nombre: "Cepillos de alambre", foto: "cepillos-alambre.jpg", marca: "EMTOP" },
      { nombre: "Choclas", foto: "choclas.jpg", marca: "EMTOP" },
      { nombre: "Cortafierros", foto: "cortafierros.jpg", marca: "EMTOP" },
      { nombre: "Cortapernos", foto: "cortapernos.jpg", marca: "EMTOP" },
      { nombre: "Cutters", foto: "esnk18302.jpg", marca: "EMTOP" },
      { nombre: "Destornilladores", foto: "destornilladores.jpg", marca: "EMTOP" },
      { nombre: "Engrapadoras", foto: "engrapadoras.jpg", marca: "EMTOP" },
      { nombre: "Espátulas", foto: "espatulas.jpg", marca: "EMTOP" },
      { nombre: "Hachas", foto: "hachas.jpg", marca: "EMTOP" },
      { nombre: "Juegos de tubos chicos", foto: "juego-de-tubos-chicos.jpg", marca: "Gladiator" },
      { nombre: "Juegos de tubos grandes", foto: "juegos-de-tubos-grandes.jpg", marca: "Gladiator" },
      { nombre: "Llaves de tubo", foto: "llaves-de-tubo.jpg", marca: "EMTOP" },
      { nombre: "Llaves torx y allen", foto: "llaves-torx-y-allen.jpg", marca: "EMTOP" },
      { nombre: "Martillos", foto: "martillos.jpg", marca: "EMTOP" },
      { nombre: "Mazas", foto: "mazas.jpg", marca: "EMTOP" },
      { nombre: "Mazas de goma", foto: "mazas-de-goma.jpg", marca: "EMTOP" },
      { nombre: "Morsas", foto: "morsas.jpg", marca: "EMTOP" },
      { nombre: "Niveles", foto: "esll26001.jpg", marca: "EMTOP" },
      { nombre: "Pico de loro", foto: "picoloro.jpg", marca: "EMTOP" },
      { nombre: "Pinzas de fuerza", foto: "pinzas-de-fuerza.jpg", marca: "EMTOP" },
      { nombre: "Pinzas de punta", foto: "pinzas-punta.jpg", marca: "EMTOP" },
      { nombre: "Pinzas universales", foto: "pinzas-universales.jpg", marca: "EMTOP" },
      { nombre: "Pistolas de silicona", foto: "pistolas-silicona.jpg", marca: "EMTOP" },
      { nombre: "Prensas", foto: "prensas.jpg", marca: "EMTOP" },
      { nombre: "Remachadoras", foto: "remachadoras.jpg", marca: "EMTOP" },
      { nombre: "Serruchos", foto: "serruchos.jpg", marca: "EMTOP" },
      { nombre: "Tenazas", foto: "tenazas.jpg", marca: "EMTOP" },
      { nombre: "Testers", foto: "testers.jpg", marca: "EMTOP" },
      { nombre: "Testers inductivos", foto: "testers-inductivos.jpg", marca: "EMTOP" },
      { nombre: "Tijeras de chapa", foto: "tijeras-de-chapa.jpg", marca: "EMTOP" },
    ],
  },
  {
    id: "soldadoras",
    nombre: "Soldadoras",
    portada: "assets/products/catalogo/soldadoras/soldadoras-inverter-electrodo.jpg",
    carpeta: "soldadoras",
    productos: [
      { nombre: "Soldadoras inverter 3 en 1", foto: "soldadoras-inverter-3en1.jpg", marca: "Gladiator" },
      { nombre: "Soldadoras inverter electrodo", foto: "soldadoras-inverter-electrodo.jpg", marca: "Energy" },
      { nombre: "Soldadoras láser", foto: "soldadoras-laser.jpg", marca: "NEO" },
    ],
  },
  {
    id: "insumos-de-ferreteria",
    nombre: "Insumos de ferretería",
    portada: "assets/products/insumos-ferreteria.webp",
    carpeta: "insumos-de-ferreteria",
    todos: true,
    grupos: [
      {
        nombre: "Discos",
        productos: [
          { nombre: "Discos de corte para metal", foto: "disco-corte-metal.webp", marca: ["Gladiator", "Energy"] },
          { nombre: "Discos diamantados continuos", foto: "disco-diamantados-continuos.jpg", marca: "Energy" },
          { nombre: "Discos diamantados segmentados", foto: "disco-diamantados-segmentados.jpg", marca: "Energy" },
          { nombre: "Discos diamantados turbo", foto: "disco-diamantados-turbos.jpg", marca: "Energy" },
        ],
      },
      {
        nombre: "Soldadura",
        productos: [
          { nombre: "Alambre MIG", foto: "alambre-mig.jpg", marca: "Energy" },
          { nombre: "Alambre MIG gasless", foto: "alambre-mig-gasless.jpg", marca: "Energy" },
          { nombre: "Electrodos", foto: "electrodos.jpg" },
        ],
      },
      {
        nombre: "Guantes",
        productos: [
          { nombre: "Guantes moteados", foto: "guantes-moteados.jpg" },
          { nombre: "Guantes PU", foto: "guantes-pu.webp" },
          { nombre: "Guantes de vaqueta", foto: "guantes-vaqueta.webp" },
        ],
      },
      {
        nombre: "Cintas y precintos",
        productos: [
          { nombre: "Cintas", foto: "cintas.webp" },
          { nombre: "Cintas de papel", foto: "cintas-de-papel.jpg", marca: "Luxom" },
          { nombre: "Cintas métricas", foto: "cintas-metricas.jpg" },
          { nombre: "Precintos", foto: "precintos.jpg" },
        ],
      },
      {
        nombre: "Cepillos y mechas",
        productos: [
          { nombre: "Cepillos", foto: "cepillos.jpg", marca: "EMTOP" },
          { nombre: "Mechas copa", foto: "mechas-copa.jpg", marca: "EMTOP" },
        ],
      },
    ],
  },
  {
    id: "insumo-de-construccion",
    nombre: "Insumo de construcción",
    portada: "assets/products/insumos-construccion.webp",
    carpeta: "insumo-de-construccion",
    productos: [
      { nombre: "Baldes de albañil", foto: "balde-albanil.jpg" },
      { nombre: "Fratachos de algarrobo", foto: "fratacho-algarrobo.webp" },
      { nombre: "Fratachos de goma espuma", foto: "fratacho-goma-espuma.webp" },
      { nombre: "Fratachos de pino", foto: "fratacho-pino.webp" },
      { nombre: "Niveladores de pisos", foto: "niveladores-de-pisos.jpg" },
      { nombre: "Zarandas", foto: "zarandas.webp" },
    ],
  },
  {
    id: "albanileria",
    nombre: "Albañilería",
    portada: "assets/products/herramientas-construccion.webp",
    carpeta: "albanileria",
    productos: [
      { nombre: "Cortadoras de cerámicos", foto: "cortadoras-de-ceramicos.jpg", marca: "EMTOP" },
      { nombre: "Cucharas de albañil", foto: "cuchara-albanil.jpg", marca: "EMTOP" },
      { nombre: "Llanas", foto: "llanas.jpg", marca: "EMTOP" },
      { nombre: "Palas", foto: "palas.jpg", marca: "OBRA" },
    ],
  },
  {
    id: "accesorios-de-pintura",
    nombre: "Accesorios de pintura",
    portada: "assets/products/accesorios-pintura.webp",
    carpeta: "accesorios-de-pintura",
    productos: [
      { nombre: "Bandejas de pintura", foto: "bandejas-de-pintura.jpg" },
      { nombre: "Minirodillos de poliéster", foto: "minirodillo-poliester.jpg" },
      { nombre: "Minirodillos de poliéster con funda", foto: "minirodillo-poliester-c-funda.jpg" },
      { nombre: "Pinceles", foto: "pinceles.jpg" },
      { nombre: "Rodillos antigota", foto: "rodillos-antigota.jpg" },
      { nombre: "Rodillos antigota ECO", foto: "rodillos-antigota-eco.jpg" },
      { nombre: "Rodillos de lana", foto: "rodillos-de-lana.jpg" },
    ],
  },
  {
    id: "electricos",
    nombre: "Eléctricos",
    portada: "assets/products/electricos.webp",
    carpeta: "electricos",
    productos: [
      { nombre: "Alargues", foto: "alargues.jpg" },
      { nombre: "Fichas", foto: "fichas.jpg" },
      { nombre: "Zapatillas con alargue", foto: "zapatillas-con-alargue.jpg" },
    ],
  },
  {
    id: "iluminacion",
    nombre: "Iluminación",
    portada: "assets/products/catalogo/iluminacion/reflectores-led-rgb.jpg",
    carpeta: "iluminacion",
    productos: [
      { nombre: "Lámparas LED", foto: "lamparas-led.jpg" },
      { nombre: "Reflectores LED RGB", foto: "reflectores-led-rgb.jpg" },
    ],
  },
  {
    id: "extractores",
    nombre: "Extractores",
    portada: "assets/products/catalogo/extractores/entubados.jpg",
    carpeta: "extractores",
    productos: [
      { nombre: "Extractores parrilleros 4\" a 8\"", foto: "parrilleros-chicos.jpg" },
      { nombre: "Extractores parrilleros 10\" y 12\"", foto: "parrilleros-grandes.jpg" },
      { nombre: "Extractores satelitales", foto: "satelitales.jpg" },
      { nombre: "Extractores direccionales", foto: "direccionales.jpg" },
      { nombre: "Extractores lineales", foto: "lineales.jpg" },
      { nombre: "Extractores entubados", foto: "entubados.jpg" },
      { nombre: "Extractores doble turbina", foto: "doble-turbina.jpg" },
      { nombre: "Extractores semi industriales", foto: "semi-industriales.jpg" },
    ],
  },
  {
    id: "separadores-de-hormigon",
    nombre: "Separadores de hormigón",
    portada: "assets/products/catalogo/separadores-de-hormigon/separador-poste.jpg",
    carpeta: "separadores-de-hormigon",
    productos: [
      { nombre: "Separadores caballete", foto: "separador-caballete.jpg" },
      { nombre: "Separadores circulares", foto: "separador-circular.jpg" },
      { nombre: "Separadores para postes", foto: "separador-poste.jpg" },
      { nombre: "Separadores triangulares", foto: "separador-triangular.jpg" },
      { nombre: "Separadores para viguetas", foto: "separador-viguetas.jpg" },
    ],
  },
  {
    id: "jardineria",
    nombre: "Jardinería",
    portada: "assets/products/jardineria.webp",
    carpeta: "jardineria",
    productos: [
      { nombre: "Bordeadoras", foto: "bordeadoras.jpg", marca: "Gladiator" },
      { nombre: "Mangueras de riego", foto: "mangueras-riego.jpg" },
      { nombre: "Podadoras", foto: "podadoras.jpg", marca: "EMTOP" },
      { nombre: "Pulverizadores", foto: "pulverizadores.jpg" },
      { nombre: "Sierras curvas", foto: "sierra-curva.jpg", marca: "EMTOP" },
      { nombre: "Tijeras", foto: "tijeras.jpg", marca: "EMTOP" },
    ],
  },
];

/* ==========================================================================
   Páginas de marca (marca.html?marca=gladiator)
   La clave es la que va en el link; "nombre" tiene que coincidir con el
   "marca" de los productos. "fondo" son las fotos que se ven detrás del nombre
   (en la tarjeta de la página principal y en el encabezado de la marca).
   "tipo": "propia" (importación propia) o "representada".
   ========================================================================== */

const MARCAS = {
  gladiator: {
    nombre: "Gladiator",
    tipo: "propia",
    texto: "Marca de importación propia: herramientas eléctricas y a batería de línea profesional, equipos de combustión, soldadoras y más.",
    fondo: [
      "assets/products/catalogo/herramientas-de-combustion/motosierras.jpg",
      "assets/products/catalogo/herramientas-electricas/linea-profesional/compresores.jpg",
    ],
  },
  neo: {
    nombre: "NEO",
    tipo: "propia",
    texto: "Marca de importación propia: herramientas eléctricas y a batería de línea industrial y soldadoras láser.",
    fondo: [
      "assets/products/catalogo/herramientas-electricas/linea-industrial/taladros.jpg",
      "assets/products/catalogo/herramientas-electricas/linea-industrial/compresores-inteligentes.jpg",
    ],
  },
  energy: {
    nombre: "Energy",
    tipo: "representada",
    texto: "Discos de corte y diamantados, alambres para soldar, soldadoras, sierras circulares y equipos a nafta.",
    fondo: [
      "assets/products/catalogo/herramientas-de-combustion/motobombas.jpg",
      "assets/products/catalogo/soldadoras/soldadoras-inverter-electrodo.jpg",
    ],
  },
  emtop: {
    nombre: "EMTOP",
    tipo: "representada",
    texto: "Herramientas de mano, de albañilería y de jardinería: pinzas, martillos, llaves, testers, tijeras y mucho más.",
    fondo: [
      "assets/products/catalogo/herramientas-de-mano/cajas-de-herramientas.jpg",
      "assets/products/catalogo/herramientas-de-mano/engrapadoras.jpg",
    ],
  },
  obra: {
    nombre: "OBRA",
    tipo: "representada",
    texto: "Herramientas para la obra y el corralón.",
    fondo: ["assets/products/catalogo/albanileria/palas.jpg"],
  },
  boltz: {
    nombre: "BOLTZ",
    tipo: "representada",
    texto: "Consultanos por WhatsApp por la línea completa de productos BOLTZ.",
    fondo: [],
  },
  luxom: {
    nombre: "Luxom",
    tipo: "representada",
    texto: "Cintas de papel para pintura y uso general.",
    fondo: ["assets/products/catalogo/insumos-de-ferreteria/cintas-de-papel.jpg"],
  },
};
