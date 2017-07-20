import { Pipe } from '@angular/core';

@Pipe({ name: 'kModerationStatus' })
export class ModerationStatusPipe {
    transform(status: number) {
        switch (status) {
            case 1:
                return 'Pending';
            case 2:
                return 'Approved';
            case 3:
                return 'Rejected';
            case 5:
                return 'Flagged for review';
            case 6:
                return 'Auto approved';
            default:
                return '';
        }
    }
}