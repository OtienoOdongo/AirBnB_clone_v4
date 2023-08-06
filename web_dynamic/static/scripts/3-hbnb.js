#!/usr/bin/node
$(document).ready(function () {
  const selectedAmenities = {};
  $(".amenities input[type='checkbox']").on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }
    for (const amenities in selectedAmenities) {
      console.log(selectedAmenities[amenities]);
    }

    updateSelectedAmenities();
  });

  const statusApiUrl = 'http://172.25.233.18:5001/api/v1/status/';
  $.get(statusApiUrl, function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  const placesSearchApiUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
  $.post({
    url: placesSearchApiUrl,
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      console.log('Success:', data);
      const placesSection = $('section.places');

      data.forEach(function (place) {
        console.log(place);
        let userFullName = 'Unknown Owner';

        if (place.user && place.user.first_name && place.user.last_name) { userFullName = `${place.user.first_name} ${place.user.last_name}`; }

        placesSection.append(`

				<article>
					<div class="title_box">
                                		<h2>${place.name}</h2>
	                              		<div class="price_by_night">$${place.price_by_night}</div>
					</div>
                            		<div class="information">
                                		<div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
						<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                		<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                            		</div>
                            		<div class="user">
                                		<b>Owner:</b> ${userFullName}
                            		</div>
                            		<div class="description">
                                		${place.description}
                            		</div>
				</article>
				`);
      });
    },
    error: function (error) {
      console.log('Error:', error);
    }
  });

  function updateSelectedAmenities () {
    const selectedAmenitiesList = Object.values(selectedAmenities);
    let content = selectedAmenitiesList.join(', ');
    if (content.length > 25) { content = content.substring(0, 25) + '...'; }
    $('.amenities h4').text(content);
  }
});
