console.log('hello')


//font family? no as option, some prebuilt from google
//padding slider x 2 dialog
//padding slider alert text
//text color, alert bg color
//border on/off and slider with color
//border radius slider
//drop shadow

const $fontFamilySelection = $('#fontFamily')
const $alertColor = $('#alertBoxColor');
const $alertBox = $('.alertBox');
const $alertButton = $('.dismiss');
const $alertMessage = $('#alertMessage')
const $alertMessageOut = $('.alertMessage');
const $forms = $('form')


$forms.on('submit', (e) => {
    e.preventDefault()
})

$fontFamilySelection.on('change', () => {
    getFontFamily($alertBox)
})

getFontFamily = (element) => {
        element.removeClass('lato montserrat raleway roboto').addClass($fontFamilySelection.val())
}

$alertColor.on('change', () => {
    getAlertColor()
})

getAlertColor = () => {
    $alertBox.css('backgroundColor', $alertColor.val())
}

$alertMessage.on('keyup', () => {
    getMessage();
})


getMessage = () => {
    $alertMessageOut.text( $alertMessage.val() ) 
    if ($alertMessage.val() === '') {
        $alertMessageOut.css('padding', '0')
    }
}

getPrev = () => {
    getFontFamily($alertBox)
    getAlertColor()
    getMessage()
}

$( document ).ready(() => {
    getPrev()
})

//going to need a foreach for the inputs to add event listeners for each input in a functional way