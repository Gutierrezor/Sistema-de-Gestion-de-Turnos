# Turnero
 
Este proyecto es una aplicación de gestión de turnos para centros de atención, donde los usuarios pueden registrar sus datos y solicitar turnos para diferentes estudios médicos, como radiografías, osteodensitometrías, mamografías y ecografías. El sistema permite visualizar y gestionar los turnos en tiempo real, tanto para los usuarios como para los administradores.

# Funcionalidades
-Registro de Turnos: Los usuarios pueden ingresar su nombre, cédula y seleccionar el tipo de estudio que desean realizar.
-Asignación de Turnos Automática: El sistema asigna un número de turno específico para cada tipo de estudio, incrementando el número de forma independiente para cada tipo.
-Visualización de Turnos: Los administradores pueden ver y gestionar los turnos en una pantalla separada, con la capacidad de editar o eliminar turnos.
-Pantalla de Llamado: Una pantalla independiente muestra los últimos 4 turnos asignados para cada estudio, permitiendo el llamado de los pacientes en tiempo real.
-Exportación a Excel: El sistema guarda los turnos asignados en un archivo Excel, generando un archivo nuevo cada día y actualizándolo cada 60 minutos. Los estudios se separan por hojas dentro del archivo Excel.

# Tecnologías Utilizadas
-Node.js: Backend de la aplicación.
-Express: Framework para manejar las solicitudes del servidor.
-HTML/CSS: Interfaz de usuario.
-JavaScript: Funcionalidad dinámica en el frontend.
-xlsx: Librería para la exportación de datos a Excel.
-pkg: Para empaquetar la aplicación en un archivo ejecutable.
