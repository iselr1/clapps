import { Observation } from './Observation';
import { registerResource } from './registry';


@registerResource('8302-2')
export class BodyHeight extends Observation {
    constructor(heightCm: number, date: Date) {
        let quanitity = {
            value: heightCm,
            unit: 'cm',
            system: 'http://unitsofmeasure.org'
        };
        super(quanitity, date, {
            coding: [{
                system: 'http://loinc.org',
                code: '8302-2',
                display: 'Body Height'
            }]
        });
    }
};
