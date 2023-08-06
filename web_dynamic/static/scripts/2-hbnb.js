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

  const apiUrl = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(apiUrl, function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  function updateSelectedAmenities () {
    const selectedAmenitiesList = Object.values(selectedAmenities);
    let content = selectedAmenitiesList.join(', ');
    if (content.length > 25) { content = content.substring(0, 25) + '...'; }
    $('.amenities h4').text(content);
  }
});
