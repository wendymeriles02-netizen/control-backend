import { BadRequestException, type ValidationError } from '@nestjs/common';

const FIELD_LABELS: Record<string, string> = {
  nombre: 'nombre',
  nombre_completo: 'nombre completo',
  descripcion: 'descripción',
  usuario: 'usuario',
  password: 'contraseña',
  cedula_identidad: 'cédula de identidad',
  role_id: 'rol',
  permission_ids: 'permisos',
  estado: 'estado',
  tv_id: 'código de TV',
  contenido_id: 'contenido',
  playlist_id: 'playlist',
  sala_id: 'sala',
  duracion_segundos: 'duración en segundos',
  posicion_segundos: 'posición en segundos',
  volumen: 'volumen',
  url: 'URL',
  ip: 'dirección IP',
  model: 'modelo',
  version_android: 'versión de Android',
  ubicacion: 'ubicación',
  tamano_bytes: 'tamaño del archivo',
  page: 'página',
  limit: 'límite',
  search: 'búsqueda',
  item_ids: 'elementos de la playlist',
  items: 'elementos',
  imagenes: 'imágenes',
  refresh_token: 'token de actualización',
};

function labelFor(property: string): string {
  return FIELD_LABELS[property] ?? property.replaceAll('_', ' ');
}

function constraintMessage(
  field: string,
  constraint: string,
  value: unknown,
  message: string,
): string {
  const label = labelFor(field);
  if (value === undefined || value === null || value === '')
    return `El campo ${label} es obligatorio.`;

  if (!message.includes('must ')) return message[0].toUpperCase() + message.slice(1);

  switch (constraint) {
    case 'isString':
      return `El campo ${label} debe ser texto.`;
    case 'isInt':
      return `El campo ${label} debe ser un número entero.`;
    case 'isNumber':
    case 'isNumberString':
      return `El campo ${label} debe ser numérico.`;
    case 'isBoolean':
      return `El campo ${label} debe ser verdadero o falso.`;
    case 'isArray':
      return `El campo ${label} debe ser una lista.`;
    case 'isUUID':
      return `El campo ${label} debe tener un UUID válido.`;
    case 'isEnum':
      return `El campo ${label} contiene una opción no válida.`;
    case 'isUrl':
      return `El campo ${label} debe ser una URL válida.`;
    case 'isIP':
      return `El campo ${label} debe ser una dirección IP válida.`;
    case 'matches':
      return `El campo ${label} tiene un formato inválido.`;
    case 'minLength':
      return `El campo ${label} es demasiado corto.`;
    case 'maxLength':
      return `El campo ${label} excede la longitud permitida.`;
    case 'min':
      return `El campo ${label} es menor que el valor permitido.`;
    case 'max':
      return `El campo ${label} excede el valor permitido.`;
    case 'arrayNotEmpty':
      return `El campo ${label} debe incluir al menos un elemento.`;
    default:
      return `El campo ${label} no es válido.`;
  }
}

export function validationMessages(errors: ValidationError[]): string[] {
  const messages: string[] = [];
  const visit = (items: ValidationError[]) => {
    for (const error of items) {
      for (const [constraint, message] of Object.entries(error.constraints ?? {}))
        messages.push(constraintMessage(error.property, constraint, error.value, message));
      if (error.children?.length) visit(error.children);
    }
  };
  visit(errors);
  return [...new Set(messages)];
}

export function validationExceptionFactory(errors: ValidationError[]) {
  return new BadRequestException({
    message: validationMessages(errors),
    error: 'Datos de entrada no válidos',
  });
}
