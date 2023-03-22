import { defaultConfig } from './instance';
import createRequest from './request';

export const axios = createRequest(defaultConfig);
