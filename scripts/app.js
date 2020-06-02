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
const $alertBoxForm = $('#alertBoxStyles');
const $buttonForm = $('#buttonStyles');
const $outputForm = $('#codeOutputForm');
const $alertWidth = $('#alertBoxPaddingX');
const $alertHeight = $('#alertBoxPaddingY');
const $alertBorderWidth = $('#alertBoxBorderWidth');
const $alertBorderRadius = $('#alertBoxBorderRadius');
const $alertMessagePadding = $('#alertMessagePadding');
const $navButton = $('nav button');
const $boxNavButton = $('#alertBoxForm');
const $buttonNavButton = $('#buttonForm');
const $dismissButtonText = $('#buttonText1');
const $dismissButton = $('.dismiss');
const $buttonWidth = $('#buttonWidth');
const $buttonHeight = $('#buttonHeight');
const $buttonBgColor = $('#buttonBgColor');
const $buttonBorderWidth = $('#buttonBorderWidth');
const $buttonBorderRadius = $('#buttonBorderRadius');
const $buttonBorderColor = $('#buttonBorderColor')

getFontFamily = (element) => {
    element.removeClass('lato montserrat raleway roboto').addClass($fontFamilySelection.val())
}

changeColor = (target, property, source) => {
    target.css(property, source.val())
}

changeUnit = (target, property, source) => {
    target.css(property, `${source.val()}rem`)
    //stretch: add variable for unit input
}

changeMessagePadding = () => {
    changeUnit($alertMessageOut, 'paddingTop', $alertMessagePadding)
    changeUnit($alertMessageOut, 'paddingBottom', $alertMessagePadding)
}

getMessage = ( target, source ) => {
    target.text( source.val() ) 
    if (source.val() === '') {
        target.css('padding', '0')
    }
}

getCurrentForm = () => {
    $forms.hide();
    if ($boxNavButton.hasClass('active')) {
        $alertBoxForm.show();
        console.log('show')
    } 
    else if ($buttonNavButton.hasClass('active')) {
        $buttonForm.show();
    }
    else {        
        $outputForm.show();
    }
}


$forms.on('submit', (e) => {
    e.preventDefault()
})

$fontFamilySelection.on('change', () => {
    getFontFamily($alertBox)
})

$alertColor.on('input', () => {
    changeColor($alertBox, 'backgroundColor', $alertColor)
})

$alertMessage.on('input', () => {
    getMessage($alertMessageOut, $alertMessage);
    changeMessagePadding();
})

$alertBorderColor.on('input', () => {
    changeColor($alertBox, 'borderColor', $alertBorderColor)
})

$alertMessageColor.on('input', () => {
    changeColor($alertMessageOut, 'color', $alertMessageColor)
})

$alertWidth.on('input', () => {
    console.log($alertWidth.val())
    changeUnit($alertBox, 'minWidth', $alertWidth)
})

$alertHeight.on('input', () => {
    changeUnit($alertBox, 'minHeight', $alertHeight)
})

$alertBorderWidth.on('input', () => {
    changeUnit($alertBox, 'borderWidth', $alertBorderWidth)
})

$alertBorderRadius.on('input', () => {
    changeUnit($alertBox, 'borderRadius', $alertBorderRadius)
})

$alertMessagePadding.on('input', () => {
    changeMessagePadding()
})

$navButton.on('click', function(e) {
    e.preventDefault();
    $navButton.removeClass('active');
    $(this).addClass('active');
    getCurrentForm()
})

$dismissButtonText.on('input', () => {
    getMessage($dismissButton, $dismissButtonText);
})

$buttonHeight.on('input', () => {
    changeUnit($dismissButton, 'minHeight', $buttonHeight)
})

$buttonWidth.on('input', () => {
    changeUnit($dismissButton, 'width', $buttonWidth)
})

$buttonBgColor.on('input', () => {
    changeColor($dismissButton, 'backgroundColor', $buttonBgColor)
})

$buttonBorderWidth.on('input', () => {
    changeUnit($dismissButton, 'borderWidth', $buttonBorderWidth)
})

$buttonBorderRadius.on('input', () => {
    changeUnit($dismissButton, 'borderRadius', $buttonBorderRadius)
})

$buttonBorderColor.on('input', () => {
    changeColor($dismissButton, 'borderColor', $buttonBorderColor)
})

getPrev = () => {
    getFontFamily($alertBox);
    changeColor($alertBox, 'backgroundColor', $alertColor);
    changeColor($alertBox, 'borderColor', $alertBorderColor);
    changeColor($alertMessageOut, 'color', $alertMessageColor);
    changeUnit($alertBox, 'width', $alertWidth)
    changeUnit($alertBox, 'minHeight', $alertHeight)
    changeUnit($alertBox, 'borderWidth', $alertBorderWidth)
    changeUnit($alertBox, 'borderRadius', $alertBorderRadius)
    getMessage($alertMessageOut, $alertMessage);
    getMessage($dismissButton, $dismissButtonText);
    changeUnit($dismissButton, 'minHeight', $buttonHeight)
    changeUnit($dismissButton, 'width', $buttonWidth)
    changeColor($dismissButton, 'backgroundColor', $buttonBgColor)
    changeUnit($dismissButton, 'borderWidth', $buttonBorderWidth)
    changeUnit($dismissButton, 'borderRadius', $buttonBorderRadius)
    changeColor($dismissButton, 'borderColor', $buttonBorderColor)
    changeMessagePadding();
}

$( document ).ready(() => {
    getPrev();
    getCurrentForm();
})

//going to need a foreach for the inputs to add event listeners for each input in a functional way