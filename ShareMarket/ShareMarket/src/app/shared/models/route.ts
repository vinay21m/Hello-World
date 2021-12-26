import { IRoute } from './interface/iRoute';

  export class Route implements IRoute {
    fromActionNodeID: number = 0;
    routeDescription!: string;
    routeDisplayName!: string;
    routeID!: string;
    routeLinkID: number = 0;
    routeName!: string;
    toActionNodeID: number = 0;
    workflowID!: string;
  }
  