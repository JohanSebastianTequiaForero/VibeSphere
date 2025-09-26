-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-09-2025 a las 13:05:35
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vibesphere`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_artista` (IN `p_nombre_usuario` VARCHAR(100), IN `p_nombre` VARCHAR(100), IN `p_apellidos` VARCHAR(100), IN `p_correo` VARCHAR(100), IN `p_password` VARCHAR(255), IN `p_competencias` TEXT, IN `p_foto_perfil` VARCHAR(255))   BEGIN
  DECLARE v_usuario_id INT;

  -- Insertar usuario como Artista (rol_id = 1)
  INSERT INTO usuarios (nombre_usuario, nombre, apellidos, correo, password, rol_id, created_at)
  VALUES (p_nombre_usuario, p_nombre, p_apellidos, p_correo, p_password, 1, NOW());

  SET v_usuario_id = LAST_INSERT_ID();

  -- Insertar datos extra del artista
  INSERT INTO artista_info (usuario_id, competencias, foto_perfil)
  VALUES (v_usuario_id, p_competencias, p_foto_perfil);

  SELECT v_usuario_id AS nuevo_usuario_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_contratista` (IN `p_nombre_usuario` VARCHAR(100), IN `p_nombre` VARCHAR(100), IN `p_apellidos` VARCHAR(100), IN `p_correo` VARCHAR(100), IN `p_password` VARCHAR(255), IN `p_categoria_id` INT)   BEGIN
  DECLARE v_usuario_id INT;

  -- Insertar usuario como Contratista (rol_id = 2)
  INSERT INTO usuarios (nombre_usuario, nombre, apellidos, correo, password, rol_id, created_at)
  VALUES (p_nombre_usuario, p_nombre, p_apellidos, p_correo, p_password, 2, NOW());

  SET v_usuario_id = LAST_INSERT_ID();

  -- Insertar categoría elegida
  INSERT INTO contratista_categoria (usuario_id, categoria_id)
  VALUES (v_usuario_id, p_categoria_id);

  SELECT v_usuario_id AS nuevo_usuario_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_usuario_basico` (IN `p_nombre` VARCHAR(100), IN `p_apellidos` VARCHAR(100), IN `p_correo` VARCHAR(100), IN `p_password` VARCHAR(255), IN `p_rol_id` INT)   BEGIN
  INSERT INTO usuarios (nombre, apellidos, correo, password, rol_id)
  VALUES (p_nombre, p_apellidos, p_correo, p_password, p_rol_id);
  SELECT LAST_INSERT_ID() AS nuevo_usuario_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_postular_a_vacante` (IN `p_usuario_id` INT, IN `p_vacante_id` INT)   BEGIN
  IF EXISTS (SELECT 1 FROM postulados WHERE usuario_id = p_usuario_id AND vacante_id = p_vacante_id) THEN
    SELECT 'Ya has postulado a esta vacante' AS mensaje;
  ELSE
    INSERT INTO postulados (usuario_id, vacante_id) VALUES (p_usuario_id, p_vacante_id);
    SELECT 'Postulación registrada' AS mensaje;
  END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `artista_info`
--

CREATE TABLE `artista_info` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `competencias` text DEFAULT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `artista_info`
--

INSERT INTO `artista_info` (`id`, `usuario_id`, `competencias`, `foto_perfil`) VALUES
(1, 12, 'Soy cantante profesional con un titulo en música en la universidad de los andes', '1757024930907-music.jpg'),
(2, 14, 'Artista musical de pop y rock,toco instrumentos como el piano,la guitarra y el ukelele ', '1757035707974-manu.jpg'),
(3, 16, 'Salsero,me gusta tocar la trompeta,las maracas y la tambora', NULL),
(4, 17, 'Toco el piano , amo la música moderna con letra romantica,pertenezco a un grupo musical', NULL),
(5, 18, 'Soy un estudiante de música , y busco realizar mis prácticas para prender y seguir creciendo profesionalmente ', NULL),
(6, 19, 'Toco el violín para todo tipo de evento', NULL),
(7, 20, 'Cantante solista con mas de 5 años de experiencia en dirección de grupos musicales', NULL),
(8, 21, 'amo la musica', '1757468517074-viol.jpg'),
(9, 22, 'Me gusta mucho hacer de tus fiestas las mejores , he trabajado y participado en grandes eventos de electrónica', '1757470510633-elec.jpg'),
(10, 26, 'Cantante', '1757544714988-direc.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canciones`
--

CREATE TABLE `canciones` (
  `cancion_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `archivo_mp3` varchar(255) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `categoria_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`categoria_id`, `nombre`) VALUES
(4, 'Educación y formación'),
(3, 'Eventos y espectáculos'),
(2, 'Grupo musical / Banda'),
(1, 'Medios y comunicación musical');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contratista_categoria`
--

CREATE TABLE `contratista_categoria` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contratista_categoria`
--

INSERT INTO `contratista_categoria` (`id`, `usuario_id`, `categoria_id`) VALUES
(1, 2, 3),
(2, 4, 4),
(3, 5, 2),
(4, 10, 1),
(5, 13, 3),
(6, 15, 4),
(7, 23, 1),
(8, 24, 3),
(9, 25, 2),
(10, 27, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contratos`
--

CREATE TABLE `contratos` (
  `contrato_id` int(11) NOT NULL,
  `vacante_id` int(11) NOT NULL,
  `artista_id` int(11) NOT NULL,
  `archivo_contrato` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulados`
--

CREATE TABLE `postulados` (
  `postulado_id` int(11) NOT NULL,
  `vacante_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `fecha_postulacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `publicacion_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `nombre_archivo` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `archivo_url` varchar(255) DEFAULT NULL,
  `tipo_publicacion` varchar(50) DEFAULT NULL,
  `fecha_publicacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `rol_id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`rol_id`, `nombre`) VALUES
(1, 'Artista'),
(2, 'Contratista');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `nombre_usuario`, `nombre`, `apellidos`, `fecha_nacimiento`, `correo`, `password`, `rol_id`, `created_at`, `updated_at`) VALUES
(1, 'temp_user_1', 'Carlos', 'Gómez', '2000-01-01', 'carlos@example.com', '123456', 1, '2025-09-01 18:34:14', '2025-09-02 05:52:21'),
(2, 'temp_user_2', 'Ana', 'López', '2000-01-01', 'ana@example.com', '123456', 2, '2025-09-01 18:34:48', '2025-09-02 05:52:21'),
(3, 'Catica_music', 'Catalina', 'Moreno Diaz', '2000-01-01', 'catatalinamore@gmail.com', 'moreno789.cata', 1, '2025-09-02 06:02:32', '2025-09-02 06:02:32'),
(4, 'Instituto letras de la musica', 'Monica', 'Agudelo Torres', '2000-01-01', 'instituto.letras@educacion.edu.co', 'letras2025.musica', 2, '2025-09-02 06:14:49', '2025-09-02 06:14:49'),
(5, 'JOSELE', 'Jose', 'Ceballos Cardoso', '2000-01-01', 'jose.ceballos23@hotmail.com', 'jose.CC', 2, '2025-09-03 21:56:54', '2025-09-03 21:56:54'),
(6, 'Maluma_oficial', 'Juan', 'Londoño Arias', '2000-01-01', 'malumita.music@hotmail.com', 'malumita.arias', 1, '2025-09-03 22:04:35', '2025-09-03 22:04:35'),
(7, 'AndresCepeda23', 'Andres', 'Cepeda', '2000-01-01', 'CepedaAndres23@gmail.com', '674539', 1, '2025-09-03 22:16:50', '2025-09-03 22:16:50'),
(9, 'Sol_de_verano', 'Laura', 'Dominguez Rico', '2000-01-01', 'lauDomin@gmail.com', 'solecito.345', 1, '2025-09-03 22:43:47', '2025-09-03 22:43:47'),
(10, 'LaMega', 'Roberto', 'Galindo Mesa', '2000-01-01', 'Galindoberto543@gmail.com', 'mega.radio99', 2, '2025-09-03 23:06:42', '2025-09-03 23:06:42'),
(11, 'Pablito_parker', 'Pablo', 'Duarte Forero', '2000-01-01', 'Pablitoparker@gmail.com', 'pablo1234', 1, '2025-09-04 17:04:18', '2025-09-04 17:04:18'),
(12, 'Sofia', 'Zapata Lozano', 'LazapataSofi@hotmail.com', '2000-01-01', 'SofiZapata', 'sofia.zapata123', 1, '2025-09-04 17:28:50', '2025-09-04 17:28:50'),
(13, 'Lucia', 'Jaramillo Vargas', 'vargasLu@musiclite.com', '2000-01-01', 'MusicLite', 'luci.App23', 2, '2025-09-04 17:30:29', '2025-09-04 17:30:29'),
(14, 'Manuel', 'Medrano Lopez', 'manumedranito.music@gmail.com', '2000-01-01', 'Manuel_Medrano', '098764menu', 1, '2025-09-04 20:28:27', '2025-09-04 20:28:27'),
(15, 'Jose', 'Ceballos Cardoso', 'jose.ceballos23@hotmail.com', '2000-01-01', 'Maluma_baby', 'ceballos,4567', 2, '2025-09-04 21:44:55', '2025-09-04 21:44:55'),
(16, 'Luis', 'Campos Ruiz', 'luisito_campo12@gmail.com', '2000-01-01', 'LuisCampos_offi', 'luis.cruiz', 1, '2025-09-05 09:50:17', '2025-09-05 09:50:17'),
(17, 'Olivia', 'Rodrigo Vargas', 'Vargasoliviaa@gmail.com', '2000-01-01', 'Olivia_Rodri', 'larodrigo.oliva234', 1, '2025-09-09 08:40:58', '2025-09-09 08:40:58'),
(18, 'Felipe', 'Turbay Olaya', 'turbay.pipe965@gmail.com', '2000-01-01', 'Pipe_Turya', '6738635738yutu', 1, '2025-09-09 18:55:09', '2025-09-09 18:55:09'),
(19, 'Jhon', 'Pabon Sucre', 'elviolin.solitario@gimail.com', '2000-01-01', 'ElViolin', 'violinista_solitario', 1, '2025-09-09 19:20:01', '2025-09-09 19:20:01'),
(20, 'Jeisson', 'Arias Rojas', 'jessrojas659@hotmail.com', '2000-01-01', 'JessArias', 'music.arias23', 1, '2025-09-09 19:35:03', '2025-09-09 19:35:03'),
(21, 'prueba1', 'prueba1', 'joto ipo', '2000-01-01', 'prueba1@email.com', '12345678', 1, '2025-09-09 20:41:57', '2025-09-09 20:41:57'),
(22, 'Carlos_music', 'Carlos', 'Perez Gutiérrez ', '2000-01-01', 'carlitosguiti24@hotmail.com', '0908765', 1, '2025-09-09 21:15:10', '2025-09-09 21:15:10'),
(23, 'Tropicana_bacanisima', 'Johan', 'Quintero Lopez', '2000-01-01', 'lop_johan65@tropicana.co', 'tropicoquetos.987', 2, '2025-09-10 06:20:37', '2025-09-10 06:20:37'),
(24, 'Javi_Dj', 'Javier', 'Quiroga Ramirez', NULL, 'javi.quiroga@gmail.com', 'javierlo09743672', 2, '2025-09-10 06:35:33', '2025-09-10 06:35:33'),
(25, 'Los_U', 'Mateo', 'Triana Acevedo', NULL, 'matetriana349@gmail.com', 'carros,triana45', 2, '2025-09-10 06:56:32', '2025-09-10 06:56:32'),
(26, 'Saris_TM', 'Sara', 'Torres Mendoza', '2004-04-02', 'sarisstor23@hotmail.com', 'lasarita12257', 1, '2025-09-10 17:51:55', '2025-09-10 17:51:55'),
(27, 'Universidad_Distrital', 'Erika', 'Serrano Jimenez', '2002-07-23', 'erikaSerranez@gmail.com', '094582349790', 2, '2025-09-10 21:03:34', '2025-09-10 21:03:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacantes`
--

CREATE TABLE `vacantes` (
  `vacante_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_publicaciones`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_publicaciones` (
`publicacion_id` int(11)
,`nombre_archivo` varchar(255)
,`descripcion` text
,`archivo_url` varchar(255)
,`tipo_publicacion` varchar(50)
,`fecha_publicacion` datetime
,`usuario_id` int(11)
,`nombre` varchar(100)
,`apellidos` varchar(100)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_vacantes_postulados`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_vacantes_postulados` (
`vacante_id` int(11)
,`titulo` varchar(150)
,`descripcion` text
,`created_at` datetime
,`contratista_id` int(11)
,`contratista_nombre` varchar(100)
,`total_postulaciones` bigint(21)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_publicaciones`
--
DROP TABLE IF EXISTS `vista_publicaciones`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_publicaciones`  AS SELECT `p`.`publicacion_id` AS `publicacion_id`, `p`.`nombre_archivo` AS `nombre_archivo`, `p`.`descripcion` AS `descripcion`, `p`.`archivo_url` AS `archivo_url`, `p`.`tipo_publicacion` AS `tipo_publicacion`, `p`.`fecha_publicacion` AS `fecha_publicacion`, `u`.`usuario_id` AS `usuario_id`, `u`.`nombre` AS `nombre`, `u`.`apellidos` AS `apellidos` FROM (`publicaciones` `p` join `usuarios` `u` on(`p`.`usuario_id` = `u`.`usuario_id`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_vacantes_postulados`
--
DROP TABLE IF EXISTS `vista_vacantes_postulados`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_vacantes_postulados`  AS SELECT `v`.`vacante_id` AS `vacante_id`, `v`.`titulo` AS `titulo`, `v`.`descripcion` AS `descripcion`, `v`.`created_at` AS `created_at`, `u`.`usuario_id` AS `contratista_id`, `u`.`nombre` AS `contratista_nombre`, count(`p`.`postulado_id`) AS `total_postulaciones` FROM ((`vacantes` `v` join `usuarios` `u` on(`v`.`usuario_id` = `u`.`usuario_id`)) left join `postulados` `p` on(`v`.`vacante_id` = `p`.`vacante_id`)) GROUP BY `v`.`vacante_id` ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `artista_info`
--
ALTER TABLE `artista_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_artista_usuario` (`usuario_id`);

--
-- Indices de la tabla `canciones`
--
ALTER TABLE `canciones`
  ADD PRIMARY KEY (`cancion_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`categoria_id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `contratista_categoria`
--
ALTER TABLE `contratista_categoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario_id` (`usuario_id`,`categoria_id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `contratos`
--
ALTER TABLE `contratos`
  ADD PRIMARY KEY (`contrato_id`),
  ADD KEY `vacante_id` (`vacante_id`),
  ADD KEY `artista_id` (`artista_id`);

--
-- Indices de la tabla `postulados`
--
ALTER TABLE `postulados`
  ADD PRIMARY KEY (`postulado_id`),
  ADD UNIQUE KEY `usuario_id` (`usuario_id`,`vacante_id`),
  ADD KEY `vacante_id` (`vacante_id`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`publicacion_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rol_id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `uc_nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `correo_2` (`correo`),
  ADD KEY `rol_id` (`rol_id`);

--
-- Indices de la tabla `vacantes`
--
ALTER TABLE `vacantes`
  ADD PRIMARY KEY (`vacante_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `artista_info`
--
ALTER TABLE `artista_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `canciones`
--
ALTER TABLE `canciones`
  MODIFY `cancion_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `categoria_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `contratista_categoria`
--
ALTER TABLE `contratista_categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `contratos`
--
ALTER TABLE `contratos`
  MODIFY `contrato_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `postulados`
--
ALTER TABLE `postulados`
  MODIFY `postulado_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `publicacion_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `vacantes`
--
ALTER TABLE `vacantes`
  MODIFY `vacante_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `artista_info`
--
ALTER TABLE `artista_info`
  ADD CONSTRAINT `fk_artista_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `canciones`
--
ALTER TABLE `canciones`
  ADD CONSTRAINT `canciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `contratista_categoria`
--
ALTER TABLE `contratista_categoria`
  ADD CONSTRAINT `contratista_categoria_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `contratista_categoria_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`categoria_id`);

--
-- Filtros para la tabla `contratos`
--
ALTER TABLE `contratos`
  ADD CONSTRAINT `contratos_ibfk_1` FOREIGN KEY (`vacante_id`) REFERENCES `vacantes` (`vacante_id`),
  ADD CONSTRAINT `contratos_ibfk_2` FOREIGN KEY (`artista_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `postulados`
--
ALTER TABLE `postulados`
  ADD CONSTRAINT `postulados_ibfk_1` FOREIGN KEY (`vacante_id`) REFERENCES `vacantes` (`vacante_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `postulados_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`rol_id`);

--
-- Filtros para la tabla `vacantes`
--
ALTER TABLE `vacantes`
  ADD CONSTRAINT `vacantes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
