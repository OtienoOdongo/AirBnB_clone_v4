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

  function updateSelectedAmenities () {
    const selectedAmenitiesList = Object.values(selectedAmenities);
    let content = selectedAmenitiesList.join(', ');
    if (content.length > 25) { content = content.substring(0, 25) + '...'; }
    $('.amenities h4').text(content);
  }
});
