export var REGISTER_RESOURCE = 'RA/REGISTER_RESOURCE';
export var UNREGISTER_RESOURCE = 'RA/UNREGISTER_RESOURCE';

export var registerResource = function registerResource(resource) {
    return {
        type: REGISTER_RESOURCE,
        payload: resource
    };
};

export var unregisterResource = function unregisterResource(resourceName) {
    return {
        type: UNREGISTER_RESOURCE,
        payload: resourceName
    };
};