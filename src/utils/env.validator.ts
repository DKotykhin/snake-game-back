import { IsNotEmpty, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Logger } from '@nestjs/common';

const logger = new Logger('env.validator.ts');

class EnvironmentVariables {
  @IsNotEmpty()
  PG_HOST: string;

  @IsNotEmpty()
  PG_DATABASE: string;

  @IsNotEmpty()
  PG_USER: string;

  @IsNotEmpty()
  PG_PASSWORD: string;

  @IsNotEmpty()
  PG_PORT: number = 5432;

  @IsNotEmpty()
  PORT: number = 4004;

  @IsNotEmpty()
  JWT_SECRET_KEY: string;

  @IsNotEmpty()
  FRONTEND_URL: string;

  @IsNotEmpty()
  SG_API_KEY: string;

  @IsNotEmpty()
  SG_EMAIL_ADDRESS: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    logger.error(errors.toString(), {
      ...errors.map(
        (error) =>
          `${Object.values(error.constraints)} | value: ${error.value}`,
      ),
    });
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
