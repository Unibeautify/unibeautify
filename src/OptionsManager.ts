import { OptionsRegistry } from "./options";
import * as _ from "lodash";

export class OptionsManager {
  /**

  */
  private _options: OptionsRegistry = {};

  /**
   * Get a shallow copy of the options currently loaded.
   */
  public get loadedOptions(): OptionsRegistry {
    return { ...this._options };
  }

  /**
   * Get a raw copy of the options currently loaded.
   */
  public get options(): OptionsRegistry {
    return this._options;
  }

  /**
  Load Options
  */
  public loadOptions(options: OptionsRegistry): OptionsManager {
    _.merge(this._options, options);
    return this;
  }
}
