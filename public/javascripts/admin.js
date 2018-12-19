$(function() {
  'use strict'

  $('#sliderimg1').on('click', function() {
    if ($(this).val()) {
      $('#programGalleryPrev-1').html('<img src="/files/uploads/images/' + $(this).val() + '" alt="' + $(this).val() + '" class="w-100 h-100 ">');
    } else {
      $('#programGalleryPrev-1').empty();
    }
  })
  $('#btn-prog-img-clear-1').on('click', function() {
    $('#programGalleryPrev-1').empty();
    $('#sliderimg1').val('');
  })

  $('#sliderimg2').on('click', function() {
    if ($(this).val()) {
      $('#programGalleryPrev-2').html('<img src="/files/uploads/images/' + $(this).val() + '" alt="' + $(this).val() + '" class="w-100 h-100 ">');
    } else {
      $('#programGalleryPrev-2').empty();
    }
  })
  $('#btn-prog-img-clear-2').on('click', function() {
    $('#programGalleryPrev-2').empty();
    $('#sliderimg2').val('');
  })

  $('#sliderimg3').on('click', function() {
    if ($(this).val()) {
      $('#programGalleryPrev-3').html('<img src="/files/uploads/images/' + $(this).val() + '" alt="' + $(this).val() + '" class="w-100 h-100 ">');
    } else {
      $('#programGalleryPrev-3').empty();
    }
  })
  $('#btn-prog-img-clear-3').on('click', function() {
    $('#programGalleryPrev-3').empty();
    $('#sliderimg3').val('');
  })

  $('[data-toggle="offcanvas"]').on('click', function() {
    $('.offcanvas-collapse').toggleClass('open');
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



  $('input[name="progSections"]').on('change', function() {

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


})
