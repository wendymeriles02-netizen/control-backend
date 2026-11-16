import { describe, expect, it } from 'vitest';
import { validationMessages } from './validation-messages.js';

describe('validationMessages', () => {
  it('traduce campos requeridos y reglas frecuentes', () => {
    expect(
      validationMessages([
        {
          property: 'nombre',
          value: undefined,
          constraints: { isString: 'nombre must be a string' },
          children: [],
        },
        {
          property: 'role_id',
          value: 'sin-uuid',
          constraints: { isUUID: 'role_id must be a UUID' },
          children: [],
        },
      ]),
    ).toEqual([
      'El campo nombre es obligatorio.',
      'El campo rol debe tener un UUID válido.',
    ]);
  });
});
