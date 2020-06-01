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
const $alertMessage = $('#alertMessage');
const $alertMessageOut = $('.alertMessage');
const $alertMessageColor = $('#alertMessageColor');
const $alertBorderColor = $('#alertBoxBorderColor');
const $forms = $('form');
const $alertWidth = $('#alertBoxPaddingX');
const $alertHeight = $('#alertBoxPaddingY')

getFontFamily = (element) => {
    element.removeClass('lato montserrat raleway roboto').addClass($fontFamilySelection.val())
}

changeColor = (target, property, source) => {
    target.css(property, source.val())
}

changeUnit = (target, property, source) => {
    target.css(property, `${source.val()}rem`)

}

getMessage = () => {
    $alertMessageOut.text( $alertMessage.val() ) 
    if ($alertMessage.val() === '') {
        $alertMessageOut.css('padding', '0')
    }
}

$forms.on('submit', (e) => {
    e.preventDefault()
})

$fontFamilySelection.on('change', () => {
    getFontFamily($alertBox)
})

$alertColor.on('change', () => {
    changeColor($alertBox, 'backgroundColor', $alertColor)
})

$alertMessage.on('keyup', () => {
    getMessage();
})

$alertBorderColor.on('change', () => {
    changeColor($alertBox, 'borderColor', $alertBorderColor)
})

$alertMessageColor.on('change', () => {
    changeColor($alertMessageOut, 'color', $alertMessageColor)
})

$alertWidth.on('input', () => {
    console.log($alertWidth.val())
    changeUnit($alertBox, 'minWidth', $alertWidth)
})

$alertHeight.on('input', () => {
    changeUnit($alertBox, 'minHeight', $alertHeight)
})


getPrev = () => {
    getFontFamily($alertBox);
    changeColor($alertBox, 'backgroundColor', $alertColor);
    changeColor($alertBox, 'borderColor', $alertBorderColor);
    changeColor($alertMessageOut, 'color', $alertMessageColor);
    getMessage();
}

$( document ).ready(() => {
    getPrev()
})

//going to need a foreach for the inputs to add event listeners for each input in a functional way