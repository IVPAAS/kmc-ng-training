import { Pipe } from '@angular/core';

@Pipe({ name: 'kMediaType' })
export class MediaTypePipe {
    transform(status: number) {
        switch (status) {
            case 1:
                return 'Video';
            case 2:
                return 'Image';
            case 5:
                return 'Audio';
            case 201:
                return 'live stream flash';
            case 202:
                return 'live stream windows media';
            case 203:
                return 'live stream real media';
            case 204:
                return 'live stream quicktime';
            default:
                return '';
        }
    }
}