

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
    changeUnit($alertMessageOut, 'padding-top', $alertMessagePadding)
    changeUnit($alertMessageOut, 'padding-bottom', $alertMessagePadding)
}

getMessage = ( target, source ) => {
    target.text( source.val() ) 
    if (source.val() === '') {
        target.css('padding', '0')
    }
}

getCurrentForm = () => {
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
    $navButton.removeClass('active btn-primary').addClass('btn btn-secondary');
    $(this).removeClass('btn btn-primary btn-secondary').addClass('active btn btn-primary');
    getCurrentForm()
})


$outputButton.on('click', () => {

    const alertBoxCss = $alertBox.css(['background-color', 'border-color', 'color', 'width', 'height', 'border-width', 'border-radius'])

    const alertMessageCss = $alertMessageOut.css(['padding-top', 'padding-bottom'])

    const alertButtonCss = $dismissButton.css(['min-height', 'width', 'background-color', 'border-width', 'border-radius', 'border-color', 'color', 'border-style'])
    
    // console.log(alertBoxCss, alertMessageCss, alertButtonCss)

    const dismissButton = document.getElementById('dismiss')
    const alertBox = document.getElementById('alertBox')

    const buttonComputedStyle = getComputedStyle(dismissButton)
    const dismissObject = {
        'min-height': buttonComputedStyle.height, 
        'width': buttonComputedStyle.width, 
        'background-color': buttonComputedStyle.backgroundColor, 
        'border-width': buttonComputedStyle.borderTopWidth, 
        'border-radius': buttonComputedStyle.borderTopRightRadius, 
        'border-style': buttonComputedStyle['border-inline-start-style'], 
        'border-color': buttonComputedStyle.borderTopColor,
        'color': buttonComputedStyle.color
    } 

    const alertBoxComputedStyle = getComputedStyle(alertBox)
    const alertBoxObject = {
        'background-color': alertBoxComputedStyle.backgroundColor, 
        'border-color': alertBoxComputedStyle.borderTopColor, 
        'color': alertBoxComputedStyle.color, 
        'width': alertBoxComputedStyle.width, 
        'height': alertBoxComputedStyle.height, 
        'border-width': alertBoxComputedStyle.borderTopWidth, 
        'border-radius': alertBoxComputedStyle.borderBottomRightRadius
    }



    const buttonJson = JSON.stringify(dismissObject, null, '\t')
    const alertBoxJson = JSON.stringify(alertBoxObject, null, '\t')

    const removeQuotes = (string) => {
        return string.replace(/"([^"]+)"/g, '$1')
    }

    const unquotedButton = removeQuotes(buttonJson)
    const unquotedAlertBox = removeQuotes(alertBoxJson)


    $outputTextarea.text(
`
//styles
button ${unquotedButton}
.alertBox ${unquotedAlertBox}
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