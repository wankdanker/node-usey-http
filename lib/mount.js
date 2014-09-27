module.exports = mount;

function mount(p) {
	return function (req, res, next) {
		return next(req.url.indexOf(p) === 0 ? null : 'use');
	};
}
