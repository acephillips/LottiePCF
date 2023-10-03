import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { LottiePCFComponent, ILottieProps } from "./LottiePCFComponent";
import * as React from "react";

const emptyURL = "";

export class LottiePCF implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private path: string;
    private playing?: boolean = true;
    private stopped?: boolean = false;
    private paused?: boolean = false;
    private usable?: boolean;


    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;

    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const animPath = (context.parameters.AnimationURL.raw == (null || undefined)) ? "" : context.parameters.AnimationURL.raw;
        const config = context.parameters;

        if (this.isValidURL(animPath)) {
            this.usable = true
        } else {
            this.usable = false
        }

        return this.usable ? React.createElement(
            LottiePCFComponent, {
            loop: config.loop.raw,
            path: animPath,
            playing: config.playing.raw,
            paused: config.paused.raw,
            stopped: config.stopped.raw,
            disableClicktoPause: config.disableClickToPause.raw

        }) : React.createElement(LottiePCFComponent, {
            loop: config.loop.raw,
            path: "",
            playing: config.playing.raw,
            paused: config.paused.raw,
            stopped: config.stopped.raw,
            disableClicktoPause: config.disableClickToPause.raw

        });
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {
            stopped: this.stopped, paused: this.paused, playing: this.playing, AnimationURL: this.path
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }

    isValidURL(url: string | null): boolean {
        if (url !== null) {
            var result = url.match(/\.json\b/g);
            return result !== null
        }
        return false
    }
}
