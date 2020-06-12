

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
const $outputHTML = $('#codeHTML');
const $outputCSS = $('#codeCSS');
const $alertMessageFormGroup = $('#messageClassGroup');
const $alertMessageClass = $('#alertMessageClass');
const $alertButtonClass = $('#buttonClass');
const $alertBoxClass = $('#alertBoxClass');
const $userAlertButton = $('#userAlerts');
const $userAlertsOut = $('#userAlertsOut');
const $alertsPage = $('#alertsPage');
const $homeButton = $('#home')
const $userAlertsBox = $('article.userAlerts > div');
const $userAlertsButton = $('article.userAlerts button');
const $userAlertsMessage = $('article.userAlerts > div > div');

let htmlToAppend, cssToAppend, dismissInlineCss, alertBoxObject, alertMessageObject, htmlClasses;

let cssToPost = { ...dismissInlineCss, ...alertBoxObject, ...alertMessageObject }





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

    const buttonComputedStyle = getComputedStyle(dismissButton)
    
    dismissInlineCss = `min-height:${$buttonHeight.val()}rem;width:${ $buttonWidth.val()}rem;background-color:${$buttonBgColor.val()};border-radius:${$buttonBorderRadius.val()}rem;border-color:${$buttonBorderColor.val()};color:${$buttonTextColor.val()};border-style:solid${$alertMessage.val() === '' ? `;margin-top:${$dismissButton.css('margin-top')}` : ''}${buttonComputedStyle.borderTopWidth === '0px'? '' : `;border-width:${$buttonBorderWidth.val()}rem`}`

    const dismissString = `{
    min-height: ${$buttonHeight.val()}rem; 
    width: ${$buttonWidth.val()}rem; 
    background-color: ${$buttonBgColor.val()}; 
    border-radius: ${$buttonBorderRadius.val()}rem; 
    border-color: ${$buttonBorderColor.val()};
    color: ${$buttonTextColor.val()};${$alertMessage.val() === '' ?  ` 
    margin-top: ${$dismissButton.css('margin-top')};` : ''} ${buttonComputedStyle.borderTopWidth === '0px'? '' : `
    border-width: ${$buttonBorderWidth.val()}rem;
    border-style: solid;`}
}`

    alertBoxObject = `background-color:${$alertColor.val()};border-color:${$alertBorderColor.val()};color:${$alertMessageColor.val()};width:${$alertWidth.val()}rem;height:${$alertHeight.val()}rem;border-radius:${$alertBorderRadius.val()}rem;font-family:${$fontFamilySelection.val()};text-align:center;border-style:solid;${$alertBorderWidth.val() == 0 ? '' : `border-width:${$alertBorderWidth.val()}rem`}`

    const alertBoxString = `{
    background-color: ${$alertColor.val()}; 
    border-color: ${$alertBorderColor.val()}; 
    color: ${$alertMessageColor.val()}; 
    width: ${$alertWidth.val()}rem; 
    height: ${$alertHeight.val()}rem; 
    border-radius: ${$alertBorderRadius.val()}rem;
    font-family: ${$fontFamilySelection.val()};
    text-align: center; ${$alertBorderWidth.val() == 0 ? '' : `
    border-width: ${$alertBorderWidth.val()}rem;
    border-style: solid;`}
}`

    alertMessageObject = `padding-top:${$alertMessagePadding.val()}rem;padding-bottom:${$alertMessagePadding.val()}rem`

    const alertMessageString = `{
    padding-top: ${$alertMessagePadding.val()}rem;
    padding-bottom: ${$alertMessagePadding.val()}rem;
}`


htmlToAppend = 
`<div class="${$alertBoxClass.val() === '' ? "alertBox" : $alertBoxClass.val()}">${$alertMessage.val() === '' ? '' : `
<p class="${$alertMessageClass.val() === '' ? "alertMessage" : $alertMessageClass.val()}">${$alertMessage.val()}</p>`}
<button class="${$alertButtonClass.val() === '' ? "dismiss" : $alertButtonClass.val()}">${$dismissButtonText.val()}</button>
</div>`

htmlContent = {
    button: `${$dismissButtonText.val()}`,
    alertMessage: $alertMessage.val()
}

cssToAppend = 
`html {
    font-size: 62.5%;
}

body {
    font-size: 1.4rem;
}

.${$alertBoxClass.val() === '' ? 'alertBox' : $alertBoxClass.val()} ${alertBoxString}

.${$alertButtonClass.val() === '' ? 'dismiss' :  $alertButtonClass.val()} ${dismissString} ${$alertMessage.val() === '' ? '' : `

.${$alertMessageClass.val() === '' ? 'alertMessage' : $alertMessageClass.val()} ${alertMessageString}`}`

cssToAppendObj = `html = {
    font-size: 62.5%;
}

body = {
    font-size: 1.4rem;
}

.${$alertBoxClass.val() === '' ? 'alertBox =' : $alertBoxClass.val()} ${alertBoxString}

.${$alertButtonClass.val() === '' ? 'dismiss =' :  $alertButtonClass.val()} ${dismissString} ${$alertMessage.val() === '' ? '' : `

.${$alertMessageClass.val() === '' ? 'alertMessage =' : $alertMessageClass.val()} ${alertMessageString}`}`

    $outputHTML.text(htmlToAppend)

    $outputCSS.text(cssToAppend)

})



$outputForm.on('submit', () => {
    postUserAlert()
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
    showClassInput()
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

$userAlertButton.on('click', () => {
    getUserAlerts()
})

$homeButton.on('focus', () => {
    console.log('focused')
}).hover(() => {
    $homeButton.toggleClass('text-light')
},
() => {
    $homeButton.toggleClass('text-light')
})



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

const showClassInput = () => {
    if ($alertMessage.val() === '') {
        $alertMessageFormGroup.hide();
    } else {
        $alertMessageFormGroup.show()
    }
}

//**this should be executing on the bottom event listeners

const getUserAlerts = () => {
    if (window.location.pathname !== '/alerts.html') {
        window.location.href = 'alerts.html'
    }
    fetch('/api/alerts').then(res => res.json()).then(data => {
        data.forEach((object ) => {
            const { alerthtml, _id, alertcss } = object;
            console.log(decodeURIComponent(alertcss.button))            
            $userAlertsOut.append(
`<article class="userAlerts ${_id} mx-4 my-5 d-flex align-items-center justify-content-center">
    <div style="${decodeURIComponent(alertcss.alertBox)}">
        ${alerthtml.alertMessage === '' ? '' : `
        <div style="${decodeURIComponent(alertcss.alertMessage)}">
            ${decodeURIComponent(alerthtml.alertMessage)}
        </div>`}
        <button style="${decodeURIComponent(alertcss.button)}">
            ${decodeURIComponent(alerthtml.button)}
        </button>
    </div>
</article>
`)
        });
    })
}


const postUserAlert = () => {
    fetch('/api/alert/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: 'Sally',
            alertname: `sally's alert`,
            alerthtml: {
                button: encodeURIComponent(htmlContent.button),
                alertMessage: encodeURIComponent(htmlContent.alertMessage)
            }, 
            alertcss: {
                button: encodeURIComponent(dismissInlineCss),
                alertBox: encodeURIComponent(alertBoxObject),
                alertMessage: encodeURIComponent(alertMessageObject)
            },
        })
        
    }).then(data => {
        console.log(data)
    })
}






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
    showClassInput()
}


$( document ).ready(() => {
    if (window.location.pathname !== '/alerts.html') {
        getPrev();
        getCurrentForm();
    } else {
        getUserAlerts()
    }
})

