const SliderModel = {
    Initialize: function () {
        localStorage.setItem('slider', JSON.stringify(SLIDER));
    },

    getAll: function () {
        return JSON.parse(localStorage.getItem('slider'));
    },
};
if (SliderModel.getAll() == null) SliderModel.Initialize();
