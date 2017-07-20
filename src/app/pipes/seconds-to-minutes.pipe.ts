import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'secondsToMinutesPipe'
})
export class SecondsToMinutesPipe implements PipeTransform {
    transform(input: number): string {
        return `${Math.floor(input / 60)}:${input % 60}`;
    }
}
