import { ValidationAcceptor, ValidationChecks } from 'langium';
import { SclAstType, Person } from './generated/ast';
import type { SclServices } from './scl-module';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: SclServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.SclValidator;
    const checks: ValidationChecks<SclAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class SclValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
