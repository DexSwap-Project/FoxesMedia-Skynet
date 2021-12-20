
import { SkynetClient } from 'skynet-js';

const portal = window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;
const NewSkyClient = new SkynetClient(portal);

export default NewSkyClient;