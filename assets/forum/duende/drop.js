(function($){
 var current_drop = '';
 var DropMenu = function(el)
 {
 var el = $(el);
 var drop = this;
 var drop_menu = $("#" + el.attr('id') + "_popup");
 
 // Opening Drop
 this.open = function(e)
 {
 e.preventDefault();

 if(drop_menu.is(':visible'))
 {
 drop.close();
 return;
 }

 drop_menu.slideDown('fast');
 el.addClass('drop-open').removeClass('drop'); 
 }
 this.openmouse = function(e)
 {
 // Setup popup menu
 var offset = el.offset();
 offset.top += el.outerHeight();

 // We only adjust if it goes out of the page (?)
 if((el.offset().left + drop_menu.outerWidth()) > $(window).width())
 var adjust = drop_menu.outerWidth() - el.outerWidth();
 else
 var adjust = 0;

 drop_menu.css({
 position: 'absolute',
 top: offset.top,
 left: offset.left-adjust
 });

 drop_menu.slideDown('fast');
 el.addClass('drop-open').removeClass('drop');

 $(document).mouseup(function (e) {
 var container = $("#" + el.attr('id') + "_popup:visible, #" + el.attr('id') + "");
 if (!container.is(e.target) && container.has(e.target).length === 0) {
 drop.close();
 }
 }); 
 } 
 this.close = function(e)
 {
 drop_menu.slideUp('fast');
 el.addClass('drop').removeClass('drop-open');
 }
 }
 $.fn.dropMenu = function(el)
 {
 return this.each(function()
 {
 var drop = new DropMenu(this, el);
 $(this).click(drop.open).mouseenter(drop.openmouse);
 });
 }
})(jQuery); 