/**
 * Created by jimmyshe-ubuntu on 17-3-21.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UiModule } from './ui.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(UiModule);