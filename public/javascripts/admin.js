$(function() {
  'use strict'


  $('[data-toggle="offcanvas"]').on('click', function() {
    $('.offcanvas-collapse').toggleClass('open');
  })

  $('#sliderImage').on('click', function() {
    if ($(this).val()) {
      $('#sliderImagePreview').html('<img src="/files/uploads/images/' + $(this).val() + '" alt="' + $(this).val() + '" class="w-100 h-100 ">');
    } else {
      $('#sliderImagePreview').empty();
    }
  })
  $('#sliderImagePreviewClear').on('click', function() {
    $('#sliderImagePreview').empty();
    $('#sliderImage').val('');
  })


  $('.wysiwyg').froalaEditor({
    heightMin: 100,
    language: 'el',
    imageManagerLoadURL: '/admin/froala/load_images',
  })


  $('.imee-prog-img').on('click', function() {
    $('#programGalleryPrev').html('<img src="' + $(this).attr('src') + '" alt="' + $(this).attr('alt') + '" class="w-100 h-100 ">');
    $('#programImage').val($(this).attr('imee-img-name'));
  })

  $('#btn-prog-img-clear').on('click', function() {
    $('#programGalleryPrev').empty();
    $('#programImage').val('');
  })

  $('#programAttachments').on('change', function() {
    $('#programAttachmentsPreview').val($(this).val());
  })
  $('#programAttachmentsPreview').val($('#programAttachments').val())

  // alert($('input[name="progSections"]').val());

  $('.imee-admin-single-section').removeClass('d-none');
  $('.imee-admin-single-section').addClass('d-block');
  $('.imee-admin-multiple-sections').removeClass('d-block');
  $('.imee-admin-multiple-sections').addClass('d-none');

  $('input[name="multiText"]').on('change', function() {

    if ($(this).val() == '2') {
      $('.imee-admin-single-section').removeClass('d-block');
      $('.imee-admin-multiple-sections').addClass('d-block');
      $('.imee-admin-multiple-sections').removeClass('d-none');
      $('.imee-admin-single-section').addClass('d-none');
    } else {
      $('.imee-admin-single-section').removeClass('d-none');
      $('.imee-admin-single-section').addClass('d-block');
      $('.imee-admin-multiple-sections').removeClass('d-block');
      $('.imee-admin-multiple-sections').addClass('d-none');

    }
  })

$('#programTypeId').on('change', function() {
  alert($('#programTypeId').val())
  $("[imee-programType-id]").val('');
  $("[imee-programType-id]").hide();
  $("[imee-programType-id='"+$('#programTypeId').val()+"']").show();
})



})
