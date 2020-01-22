import {Page} from "./page.model";
import {ResourceWithPermissions} from "./resource-with-permissions.model";

export class PermissionsModel {
    public editable: boolean;

    static fromResource<T extends PermissionsModel>(resource: ResourceWithPermissions<T>): T {
        let model = resource.payload;
        model.editable = resource.editable;
        return model;
    }

    static fromResourceArray<T extends PermissionsModel>(resourceArray: ResourceWithPermissions<T>[]): T[] {
        return resourceArray.map(resource => PermissionsModel.fromResource(resource));
    }

    static fromResourcePage<T extends PermissionsModel>(resourcePage: Page<ResourceWithPermissions<T>>): Page<T> {
        const models = PermissionsModel.fromResourceArray(resourcePage.content);
        return new Page<T>(models, resourcePage.totalElements);
    }
}
