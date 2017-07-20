import { Pipe, PipeTransform } from '@angular/core';
import { KalturaEntryModerationStatus } from 'kaltura-typescript-client/types/KalturaEntryModerationStatus';

@Pipe({
    name: 'entryModerationToString'
})
export class EntryModerationToString implements PipeTransform {
    transform(input: KalturaEntryModerationStatus): string {

        const indexInput: KalturaEntryModerationStatus = input;

        switch (input) {
            case KalturaEntryModerationStatus.approved:
                return 'Approved';
            case KalturaEntryModerationStatus.autoApproved:
                return 'Auto Approved';
            case KalturaEntryModerationStatus.flaggedForReview:
                return 'Flagged for Review';
            case KalturaEntryModerationStatus.pendingModeration:
                return 'Pending Moderation';
            case KalturaEntryModerationStatus.rejected:
                return 'Rejected';
            default:
                return KalturaEntryModerationStatus[indexInput];
        }
    }
}
