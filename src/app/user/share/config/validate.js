export const CONFIG = {
    errorClass: "user-error",
    errorPlacement: function (error, element) {
        $(element)
            .parents('[name="formItem"]')
            .find('[name="userErrorSignal"]')
            .html(error);
    },
    errorElement: "p",
    focusCleanup: true,
    onFocusout: true,
    success: function (label) {},
};