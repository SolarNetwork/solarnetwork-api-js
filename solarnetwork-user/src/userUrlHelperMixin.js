export const DefaultSolarUserPath = '/solaruser';

export const SolarUserPathKey = 'solarUserPath';

export const SolarUserApiPathV1 = '/api/v1/sec';

const UserUrlHelperMixin = (superclass) => class extends superclass {

	baseUrl() {
		const path = this.env(SolarUserPathKey) || DefaultSolarUserPath;
		return this.hostUrl() + path + SolarUserApiPathV1;
	}

};

export default UserUrlHelperMixin;
