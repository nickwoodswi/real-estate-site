function Calculator() {
    //$('#calculate').on('click', function() {
      let inputs = document.getElementsByClassName('input');
      let P = inputs[0].value;
      let county = inputs[1].value;
      let downPayment = inputs[2].value;
      let n = inputs[3].value*12;
      let apr = inputs[4].value;
      let I = apr/100;
      let M = (P-downPayment)*(((I/12)*(1+(I/12)^n))/((1+(I/12)^n-1)));
      let monthlyPayment = (M).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      let usdPayment = '$'+monthlyPayment
      $('div.result').html(`${usdPayment}`)
      let searchUrl = 'https://www.firstweber.com/homes-for-sale/'+county+'_county/0_search-price-low/'+P+'_search-price-high/P_lp-cd-presentation/sc_lsearch_amt_search_price+DESC/sd_S2/';
      console.log(searchUrl)
      loadPropertyDetails(searchUrl)
    //});
  }

  function loadPropertyDetails(searchUrl) {
    fetch(searchUrl)
    .then((response) => {
      return response.text();
    })
    .then ((pageSource) => {
      const properties = [];
      $.each($(pageSource), function(_, element) {
        if (element.id === 'pagewrap') {
          const $listing = $(element).find('.props_summary .property');
          $listing.each(function(i, property) {
            const street = $(property)
              .find('.address')
              .text();
            const streetSubj = $(property)
              .find('.address')
              .text()
              .split(" ")
              .join("%20");
            const city = $(property)
              .find('.city')
              .text();
            const price = $(property)
              .find('.price')
              .text()
              .trim();
            const [bedrooms, full, half] = $(property)
              .find('.bedbath')
              .text()
              .trim()
              .split('|')
              .filter(room => room.length > 1)
              .map(string => {
                return string.trim();
              });
            const rooms = { bedrooms, full, half };
            const link = `http://firstweber.com/${$(property)
              .find('.tilelink')
              .attr('href')}`;
            const photo = $(property)
              .find('img')
              .attr('src');
            if (
              city &&
              price &&
              street &&
              link &&
              photo &&
              Object.values(rooms).filter(value => value).length >= 2
            )
              properties.push({ street, city, price, rooms, link, photo, streetSubj });
          });
        }
      });
      buildPreview(properties);
    });
  }

function buildPreview(properties) {
  let item = properties[Math.floor(Math.random() * properties.length)]
  console.log(item)
  $('div.suggested-property-image').html(
    `<img class="suggested-property-image-preview" src="${item.photo}"></img><br>
    <a href="mailto:ksewart@firstweber.com?subject=Schedule%20showing%20at%20${item.street}">Schedule Showing</a>`
  )
  if (item.rooms.half === undefined) {
    $('div.suggested-property-info').html(
      `<h3>${item.price}</h3>
      <h4>${item.city}<br>
      <h4>${item.rooms.bedrooms}<br> 
      <h4>${item.rooms.full}</h4><br>
      <a href="${item.link}" target="_blank">View Full Listing</a>`)
    } else {
      $('div.suggested-property-info').html(
        `<h3>${item.price}</h3>
        <h4>${item.city}<br>
        <h4>${item.rooms.bedrooms}<br> 
        <h4>${item.rooms.full}<br>
        <h4>${item.rooms.half}</h4>
        <a href="${item.link}" target="_blank">View Full Listing</a>`)
  }
}

function clickCalculator() {
      $('#calculate').on('click', function() {
        let inputs = document.getElementsByClassName('input');
        let P = inputs[0].value;
        let county = inputs[1].value;
        let downPayment = inputs[2].value;
        let n = inputs[3].value*12;
        let apr = inputs[4].value;
        let I = apr/100;
        let M = (P-downPayment)*(((I/12)*(1+(I/12)^n))/((1+(I/12)^n-1)));
        let monthlyPayment = (M).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        let usdPayment = '$'+monthlyPayment
        $('div.result').html(`${usdPayment}`)
        let searchUrl = 'https://www.firstweber.com/homes-for-sale/'+county+'_county/0_search-price-low/'+P+'_search-price-high/P_lp-cd-presentation/sc_lsearch_amt_search_price+DESC/sd_S2/';
        console.log(searchUrl)
        loadPropertyDetails(searchUrl)
      });
}

Calculator();
clickCalculator();