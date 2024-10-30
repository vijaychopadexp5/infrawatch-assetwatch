jQuery.fn.serializeObject = function () {
    var o = {}
    var a = this.serializeArray()
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]]
            }
            o[this.name].push(this.value || '')
        } else {
            o[this.name] = this.value || ''
        }
    })
    return o
}

var apiUrl = 'https://api.canaris.in/'

    ; (function (apiUrl, $) {
        function initNotifyIos() {

            $(document).on('submit', '#contactForm', function (event) {
                event.preventDefault()
                event.stopPropagation()

                var formValues = $('#contactForm').serialize()

                $.ajax({
                    method: 'POST',
                    url: apiUrl,
                    data: formValues,
                    success: function (response) {
                        $('#contactForm').trigger('reset')
                        $('#contactSuccess').removeClass('hide')
                        setTimeout(
                            function () {
                                $('#contactSuccess').addClass('hide')
                            }, 5000
                        )
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $('#contactError').removeClass('hide')
                        setTimeout(
                            function () {
                                $('#contactError').addClass('hide')
                            }, 5000
                        )
                    },
                })
            })
        }
        initNotifyIos();
    })(apiUrl, window.jQuery)

