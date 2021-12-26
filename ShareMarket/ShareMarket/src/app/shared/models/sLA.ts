import { ISLA } from './interface';
import { TimeUnit } from './statusEnum';

export class SLA implements ISLA {
    companyID!: string;
    isNew!: boolean;
    locked!: boolean;
    lockedReason!: string;
    slaid!: string;
    slaName!: string;
    slaNumber!: number;
    slaUnit!: TimeUnit;
    slaCaseSource!: string;

    get slaID(): string { return this.slaid; }
    set slaID(id: string) { this.slaid = id || ''; }
}
