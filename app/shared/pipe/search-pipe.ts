import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter'
})

// Pipe to implement a search filter basd on input

export class SearchPipe implements PipeTransform {
    transform(items: any[], searchTerm: string): any[] {
        if (!items) { return []; }
        if (!searchTerm) { return items; }
        const i = searchTerm.length;
        searchTerm = searchTerm.toLowerCase();
        return items.filter((val) => {
            return val.name.toLowerCase().substr(0, i).match(searchTerm);
        });
    }
}
