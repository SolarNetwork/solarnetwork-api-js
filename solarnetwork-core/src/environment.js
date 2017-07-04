class Environment {
	constructor(config) {
		this._config = Object.assign({}, config);
		this.setupDefaults();
	}

	setupDefaults() {
		this.protocol() || this.protocol('https');
		this.host() || this.host('data.solarnetwork.net');
	}

	host(_) {
		return arguments.length
			? (this._config.host = _, this)
			: this._config.host;
	}

	protocol(_) {
		return arguments.length
			? (this._config.protocol = _, this)
			: this._config.protocol;
	}
}

export default Environment;
