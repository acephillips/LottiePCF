/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    AnimationURL: ComponentFramework.PropertyTypes.StringProperty;
    autoplay: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    playing: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    paused: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    stopped: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    loop: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    disableClickToPause: ComponentFramework.PropertyTypes.TwoOptionsProperty;
}
export interface IOutputs {
    AnimationURL?: string;
    autoplay?: boolean;
    playing?: boolean;
    paused?: boolean;
    stopped?: boolean;
    loop?: boolean;
    disableClickToPause?: boolean;
}
