import { Pipe, PipeTransform } from '@angular/core';
import { KalturaMediaType } from 'kaltura-typescript-client/types/KalturaMediaType';

@Pipe({
    name: 'entryTypeToString'
})
export class EntryTypeToString implements PipeTransform {
    transform(input: KalturaMediaType): string {

        const indexInput: KalturaMediaType = input;

        switch (input) {
            case KalturaMediaType.audio:
                return 'Audio';
            case KalturaMediaType.image:
                return 'Image';
            case KalturaMediaType.liveStreamFlash:
                return 'Live Stream Flash';
            case KalturaMediaType.liveStreamQuicktime:
                return 'Live Stream Quicktime';
            case KalturaMediaType.liveStreamRealMedia:
                return 'Live Stream RealMedia';
            case KalturaMediaType.liveStreamWindowsMedia:
                return 'Live Stream Windows Media';
            case KalturaMediaType.video:
                return 'Video';
            default:
                return KalturaMediaType[indexInput];
        }
    }
}
