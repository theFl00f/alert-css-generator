

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
const $outputButton = $('#codeOutput')
const $dismissButtonText = $('#buttonText1');
const $dismissButton = $('#dismiss');
const $buttonWidth = $('#buttonWidth');
const $buttonHeight = $('#buttonHeight');
const $buttonBgColor = $('#buttonBgColor');
const $buttonBorderWidth = $('#buttonBorderWidth');
const $buttonBorderRadius = $('#buttonBorderRadius');
const $buttonBorderColor = $('#buttonBorderColor');
const $buttonTextColor = $('#buttonTextColor');
const $outputTextarea = $('#codeOutputForm textarea');









const getFontFamily = (element) => {
    element.removeClass('lato montserrat raleway roboto').addClass($fontFamilySelection.val())
}

const changeColor = (target, property, source) => {
    target.css(property, source.val())
}

const changeUnit = (target, property, source) => {
    target.css(property, `${source.val()}rem`)
    //stretch: add variable for unit input
}

const changeMessagePadding = () => {
    changeUnit($alertMessageOut, 'padding-top', $alertMessagePadding)
    changeUnit($alertMessageOut, 'padding-bottom', $alertMessagePadding)
    if ($alertMessage.val() === '') {
        $alertMessageOut.addClass('d-none');
        changeUnit($alertButton, 'margin-top', $alertMessagePadding)
        $alertButton.css('margin-top', '3.25rem')
        $alertMessagePadding.on('input', () => {
            changeUnit($alertButton, 'margin-top', $alertMessagePadding)
        })
    } else {
        $alertMessagePadding.off().on('input', () => {
            changeMessagePadding()
        })
        $alertMessageOut.removeClass('d-none');
        $alertButton.css('margin-top', '0rem');
    }
}


const getMessage = ( target, source ) => {
    target.text( source.val() ) 
    if (source === $alertMessage) {
        if ($alertMessage.val() === '') {
            target.css('padding', '0')
            $alertMessagePadding.val(0)

        } else if ($alertMessage.val().length === 1) {
            source.css('padding', '0');
            $alertMessagePadding.val(1.5)
        }
    }
}

const getCurrentForm = () => {
    $forms.removeClass('d-block').addClass('d-none');
    if ($boxNavButton.hasClass('active')) {
        $alertBoxForm.addClass('d-block');
    } 
    else if ($buttonNavButton.hasClass('active')) {
        $buttonForm.addClass('d-block');
    }
    else {        
        $outputForm.addClass('d-block');
    }
}





$forms.on('submit', (e) => {
    e.preventDefault()
})

$navButton.on('click', function(e) {
    e.preventDefault();
    $navButton.removeClass('active btn-dark').addClass('btn btn-light');
    $(this).removeClass('btn btn-light').addClass('active btn btn-dark');
    getCurrentForm()
})


$outputButton.on('click', () => {

    const dismissButton = document.getElementById('dismiss')
    const alertBox = document.getElementById('alertBox')
    const alertMessage = document.getElementById('alertMessageOut')

    const buttonComputedStyle = getComputedStyle(dismissButton)
    const dismissString = `{
    min-height: ${buttonComputedStyle.height}, 
    width: ${buttonComputedStyle.width}, 
    background-color: ${buttonComputedStyle.backgroundColor}, 
    border-radius: ${buttonComputedStyle.borderTopRightRadius}, 
    border-style: ${buttonComputedStyle['border-inline-start-style']}, 
    border-color: ${buttonComputedStyle.borderTopColor},
    color: ${buttonComputedStyle.color}${$alertMessage.val() === '' ?  `, 
    margin-top: ${buttonComputedStyle.marginTop}` : ''}
}`

    buttonComputedStyle.borderTopWidth === '0px' ? null : dismissString['border-width'] = buttonComputedStyle.borderTopWidth;

    const alertBoxComputedStyle = getComputedStyle(alertBox)
    const alertBoxString = `{
    background-color: ${alertBoxComputedStyle.backgroundColor}, 
    border-color: ${alertBoxComputedStyle.borderTopColor}, 
    color: ${alertBoxComputedStyle.color}, 
    width: ${alertBoxComputedStyle.width}, 
    height: ${alertBoxComputedStyle.height}, 
    border-radius: ${alertBoxComputedStyle.borderBottomRightRadius},
    font-family: ${alertBoxComputedStyle.fontFamily}
}`


    alertBoxComputedStyle.borderTopWidth === '0px' ? null : alertBoxString['border-width'] = alertBoxComputedStyle.borderTopWidth;

    const alertMessageComputedStyle = getComputedStyle(alertMessage)
    const alertMessageString = `{
    padding-top: ${alertMessageComputedStyle.paddingTop},
    padding-bottom: ${alertMessageComputedStyle.paddingBottom}
}`

    $outputTextarea.text(
`
//styles
.alertBox ${alertBoxString}
button ${dismissString} ${$alertMessage.val() === '' ? '' : `
.alertMessage ${alertMessageString}`}
`)

})




$fontFamilySelection.on('change', () => {
    getFontFamily($alertBox)
})

$alertColor.on('input', () => {
    changeColor($alertBox, 'background-color', $alertColor)
})

$alertMessage.on('input', () => {
    getMessage($alertMessageOut, $alertMessage);
    changeMessagePadding();
})

$alertBorderColor.on('input', () => {
    changeColor($alertBox, 'border-color', $alertBorderColor)
})

$alertMessageColor.on('input', () => {
    changeColor($alertMessageOut, 'color', $alertMessageColor)
})

$alertWidth.on('input', () => {
    changeUnit($alertBox, 'width', $alertWidth)
})

$alertHeight.on('input', () => {
    changeUnit($alertBox, 'height', $alertHeight)
})

$alertBorderWidth.on('input', () => {
    changeUnit($alertBox, 'border-width', $alertBorderWidth)
})

$alertBorderRadius.on('input', () => {
    changeUnit($alertBox, 'border-radius', $alertBorderRadius)
})

$alertMessagePadding.on('input', () => {
    changeMessagePadding()
})






$dismissButtonText.on('input', () => {
    getMessage($dismissButton, $dismissButtonText);
})

$buttonHeight.on('input', () => {
    changeUnit($dismissButton, 'min-height', $buttonHeight)
})

$buttonWidth.on('input', () => {
    changeUnit($dismissButton, 'width', $buttonWidth)
})

$buttonBgColor.on('input', () => {
    changeColor($dismissButton, 'background-color', $buttonBgColor)
})

$buttonBorderWidth.on('input', () => {
    changeUnit($dismissButton, 'border-width', $buttonBorderWidth)
})

$buttonBorderRadius.on('input', () => {
    changeUnit($dismissButton, 'border-radius', $buttonBorderRadius)
})

$buttonBorderColor.on('input', () => {
    changeColor($dismissButton, 'border-color', $buttonBorderColor)
})

$buttonTextColor.on('input', () => {
    changeColor($dismissButton, 'color', $buttonTextColor)
})


getPrev = () => {
    getFontFamily($alertBox);
    changeColor($alertBox, 'background-color', $alertColor);
    changeColor($alertBox, 'border-color', $alertBorderColor);
    changeColor($alertMessageOut, 'color', $alertMessageColor);
    changeUnit($alertBox, 'width', $alertWidth)
    changeUnit($alertBox, 'height', $alertHeight)
    changeUnit($alertBox, 'border-width', $alertBorderWidth)
    changeUnit($alertBox, 'border-radius', $alertBorderRadius)
    getMessage($alertMessageOut, $alertMessage);
    getMessage($dismissButton, $dismissButtonText);
    changeUnit($dismissButton, 'min-height', $buttonHeight)
    changeUnit($dismissButton, 'width', $buttonWidth)
    changeColor($dismissButton, 'background-color', $buttonBgColor)
    changeUnit($dismissButton, 'border-width', $buttonBorderWidth)
    changeUnit($dismissButton, 'border-radius', $buttonBorderRadius)
    changeColor($dismissButton, 'border-color', $buttonBorderColor);
    changeColor($dismissButton, 'color', $buttonTextColor);
    changeMessagePadding();


}

$( document ).ready(() => {
    getPrev();
    getCurrentForm();
})

//going to need a foreach for the inputs to add event listeners for each input in a functional way