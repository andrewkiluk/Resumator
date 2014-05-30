Array.prototype.move = function(from, to) {
	    this.splice(to, 0, this.splice(from, 1)[0]);
};

var sortOpts = {
	axis: "y",
	containment: "#blockList",
	cursor: "move",
	distance: 30,
	tolerance: "pointer",
	start: function(event, ui) {
		ui.item.startPos = ui.item.index();
	},
	stop: function(event, ui) {
		console.log(blockArray.length);
		console.log("Start position: " + ui.item.startPos);
		console.log("New position: " + ui.item.index());
		blockArray.move(ui.item.startPos, ui.item.index());
	}
};
$('#blockList').sortable(sortOpts);



  //  FUCK. Somehow re-sorting and buildling the resume really don't interact well.
  // It's because the titles are not dynamically set.
  // And not just titles, also the input field names.
  // Yeah that needs some serious fixing.
  // Hokay, we'll just remove references to the block number and every time we need to look up an input we start with the block number.
  // Oh, or maybe encapsulating each block's input in a form would be useful?
  // :(((((




var blockArray = [{"type": "keyValueBlock", "size": "4"}, {"type": "lr-keyValueBlock", "size": "1"}, {"type": "descriptionBlock", "size": "1"}, {"type": "listBlock", "size": "1"}];

// Add a new key-value block
$(document).on('click', '.kvAddBlock', function(){
	var blockIndex = blockArray.length;
	blockArray[blockIndex] = {"type": "keyValueBlock", "size": "1"};

	$('#blockList').append(
		'<li class="block row keyValueBlock"><div class="large-12 columns"><div class="panel"><div style="float:right;"><img src="img/x.png" class="closeBox" width="25" height="25" ></div><div class="large-4 columns">'
		+ '<input name="title" placeholder="Title" type="text" />'
		+ '</div><ul class="entryList"><li><div class="row"><div class="large-8 large-offset-2 columns"><div class="large-6 columns" >'
		+ '<input name="input_' + '0_0" ' + 'placeholder="Key" type="text" />'
		+ '</div><div class="large-6 columns">'
		+ '<input name="input_' + '0_1" ' + 'placeholder="Value" type="text" />'
		+ '</div></div><div class="large-2 columns" style="padding: .25rem;">&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;<img src="img/plus.png" class="kvAddEntry" width="25" height="25" ></div></div></li></ul></div></div></li>'
	);
});

// Add a new left-right key-value block
$(document).on('click', '.lr-kvAddBlock', function(){
	var blockIndex = blockArray.length;
	blockArray[blockIndex] = {"type": "lr-keyValueBlock", "size": "1"};
	$('#blockList').append(
		'<li class="block row lr-keyValueBlock"><div class="large-12 columns"><div class="panel"><div style="float:right;"><img src="img/x.png" class="closeBox" width="25" height="25" ></div><div class="large-4 columns">'
		+ '<input name="title" placeholder="Title" type="text" />'
		+ '</div><ul class="entryList"><li><div class="row"><div class="large-8 large-offset-2 columns"><div class="large-6 columns" >'
		+ '<input name="input_' + '0_0" ' + 'placeholder="Key" type="text" />'
		+ '</div><div class="large-6 columns">'
		+ '<input name="input_' + '0_1" ' + 'placeholder="Value" type="text" />'
		+ '</div></div><div class="large-2 columns" style="padding: .25rem;">&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;<img src="img/plus.png" class="lr-kvAddEntry" width="25" height="25" ></div></div></li></ul></div></div></li>'
	);
});

// Add a new description block
$(document).on('click', '.descriptionAddBlock', function(){
	var blockIndex = blockArray.length;
	blockArray[blockIndex] = {"type": "descriptionBlock", "size": "1"};
	$('#blockList').append(
		'<li class="block row descriptionBlock"><div class="large-12 columns"><div class="panel"><div style="float:right;"><img src="img/x.png" class="closeBox" width="25" height="25" ></div><div class="large-4 columns">'
		+ '<input name="title" placeholder="Title" type="text" />'
		+ '</div><ul class="entryList">'
		+'<li><div class="row">	<div class="large-8 large-offset-2 columns"><div class="large-6 columns" >'
		+ '<input name="input_' + '0_0"'
		+ 'placeholder="Subtitle" type="text" /></div><div class="large-6 columns"></div><div class="large-12 columns">' 
		+ '<textarea rows="4" name="input_' + '0_1"' 
		+ 'placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus, nisi at consequat consequat, orci risus mattis dolor, sed luctus leo elit nec felis. Ut porttitor elit felis, at tincidunt arcu commodo ac. Sed dictum augue sed auctor pellentesque. Curabitur adipiscing et turpis quis mollis."></textarea></div></div><div class="large-2 columns" style="padding: .25rem;">&nbsp;&nbsp; <img src="img/plus.png" class="descriptionAddEntry" width="25" height="25" ></div></div></li></ul></div></div></li>'

	);
});

// Add a new list block
$(document).on('click', '.listAddBlock', function(){
	var blockIndex = blockArray.length;
	blockArray[blockIndex] = {"type": "listBlock", "size": "1"};
	$('#blockList').append(
		'<li class="block row descriptionBlock"><div class="large-12 columns"><div class="panel"><div style="float: right;"><img src="img/x.png" class="closeBox" width="25" height="25" ></div><div class="large-4 columns">'
	+ '<input name="title" placeholder="Title" type="text" />'
	+ '</div><ul class="entryList"><li><div class="row">	<div class="large-8 large-offset-2 columns"><div class="large-9 columns" >'
	+ '<input name="input_0" placeholder="List Item" type="text" />'
	+ '</div></div><div class="large-2 columns" style="padding: .25rem;">&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;<img src="img/plus.png" class="listAddEntry" width="25" height="25" ></div></div></li></ul></div></div></li>'
	);
});

// Add a new key-value entry
$(document).on('click', '.kvAddEntry', function(){
	var blockIndex = $(this).closest(".block").index();
	$(this).closest(".entryList").append('<li><div class="row"><div class="large-8 large-offset-2 columns"><div class="large-6 columns" >'
		+ '<input name="input_' + blockArray[blockIndex].size + '_0" '
		+ 'placeholder="Key" type="text" /></div><div class="large-6 columns">'
		+ '<input name="input_' + blockArray[blockIndex].size + '_1" '
		+ 'placeholder="Value" type="text" /></div></div><div class="large-2 columns" style="padding: .25rem;"><img src="img/x.png" class="lineRemove" width="25" height="25" >&nbsp;&nbsp; <img src="img/plus.png" class="kvAddEntry" width="25" height="25" ></div></div></li>');
	blockArray[blockIndex].size++;
	$(this).remove();
});

// Add a new left-right key-value entry
$(document).on('click', '.lr-kvAddEntry', function(){
	var blockIndex = $(this).closest(".block").index();
	$(this).closest(".entryList").append('<li><div class="row"><div class="large-8 large-offset-2 columns"><div class="large-6 columns" >'
		+ '<input name="input_' + blockArray[blockIndex].size + '_0" '
		+ 'placeholder="Key" type="text" /></div><div class="large-6 columns">'
		+ '<input name="input_' + blockArray[blockIndex].size + '_1" '
		+ 'placeholder="Value" type="text" /></div></div><div class="large-2 columns" style="padding: .25rem;"><img src="img/x.png" class="lineRemove" width="25" height="25" >&nbsp;&nbsp; <img src="img/plus.png" class="lr-kvAddEntry" width="25" height="25" ></div></div></li>');
	blockArray[blockIndex].size++;
	$(this).remove();
});

// Add a new description entry
$(document).on('click', '.descriptionAddEntry', function(){
	var blockIndex = $(this).closest(".block").index();
	$(this).closest(".entryList").append('<li><div class="row">	<div class="large-8 large-offset-2 columns"><div class="large-6 columns" >'
	+ '<input name="input_' + blockArray[blockIndex].size + '_0" ' 
	+ 'placeholder="Subtitle" type="text" /></div><div class="large-6 columns"></div><div class="large-12 columns">' 
	+ '<textarea rows="4" name="input_' + blockArray[blockIndex].size + '_1" ' 
	+ 'placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus, nisi at consequat consequat, orci risus mattis dolor, sed luctus leo elit nec felis. Ut porttitor elit felis, at tincidunt arcu commodo ac. Sed dictum augue sed auctor pellentesque. Curabitur adipiscing et turpis quis mollis."></textarea></div></div><div class="large-2 columns" style="padding: .25rem;"><img src="img/x.png" class="lineRemove" width="25" height="25" >&nbsp;&nbsp; <img src="img/plus.png" class="descriptionAddEntry" width="25" height="25" ></div></div></li>');
	blockArray[blockIndex].size++;
	$(this).remove();
});

// Add a new list entry
$(document).on('click', '.listAddEntry', function(){
	var blockIndex = $(this).closest(".block").index();
	$(this).closest(".entryList").append(
	'<li><div class="row">	<div class="large-8 large-offset-2 columns"><div class="large-9 columns" >'
	+ '<input name="input_' + blockArray[blockIndex].size + '" ' + 'placeholder="List Item" type="text" />'
	+ '</div></div><div class="large-2 columns" style="padding: .25rem;"><img src="img/x.png" class="lineRemove" width="25" height="25" >&nbsp;&nbsp;&nbsp;<img src="img/plus.png" class="listAddEntry" width="25" height="25" ></div></div></li>'
	);
	blockArray[blockIndex].size++;
	$(this).remove();
});

// Remove an entry from a block
$(document).on('click', '.lineRemove', function(){
	var blockIndex = $(this).closest(".block").index();
	if($(this).closest('li').is(':last-child')){
		if(blockArray[blockIndex].type === 'keyValueBlock'){
			$(this).closest('li').prev().find('.large-2').append('<img src="img/plus.png" class="kvAddEntry" width="25" height="25" >');
		}
		if(blockArray[blockIndex].type === 'lr-keyValueBlock'){
			$(this).closest('li').prev().find('.large-2').append('<img src="img/plus.png" class="lr-kvAddEntry" width="25" height="25" >');
		}
		if(blockArray[blockIndex].type === 'descriptionBlock'){
			$(this).closest('li').prev().find('.large-2').append('<img src="img/plus.png" class="descriptionAddEntry" width="25" height="25" >');
		}
		if(blockArray[blockIndex].type === 'listBlock'){
			$(this).closest('li').prev().find('.large-2').append('<img src="img/plus.png" class="listAddEntry" width="25" height="25" >');
		}
	}

	blockArray[blockIndex].size--;
	$(this).closest("li").remove();
});

// Remove a block
$(document).on('click', '.closeBox', function(){
	var blockIndex = $(this).closest(".block").index();
	blockArray.splice(blockIndex, 1);

	$(this).closest(".block").remove();
});

// Clear all input fields
$(document).on('click', '#clearButton', function(){
	$(document).find('input:text').val('');
	$(document).find('textarea').val('');
});

// Create the resume
$(document).on('click', '#resumateButton', function(){    
	var resume = 
	{
		'fontSize' : 12,
		'name' : $('input[name="name"]').val(),
		'numBlocks' : blockArray.length,
		'blocks' : [], 
	};

	for(blockIndex=0; blockIndex<blockArray.length; blockIndex++){
		blockLength = $('#blockList').find('.entryList').eq(blockIndex).find('li').length;

		resume.blocks[blockIndex] = 
		{
			'type' : blockArray[blockIndex].type,
			'title' : $('#blockList').find('[name="title"]').eq(blockIndex).val(),
			'numEntries' : blockLength, 
			'entries' : [],
		};
		switch(blockArray[blockIndex].type){
			case 'keyValueBlock':
			case 'lr-keyValueBlock':
			case 'descriptionBlock':
				for(entryIndex=0; entryIndex < blockLength; entryIndex++){
					var inputSelector = '[name="' + "input_" + entryIndex + '_0"]';
					var key = $('#blockList').find('.block').eq(blockIndex).find(inputSelector).val();
					var inputSelector = '[name="' + "input_" + entryIndex + '_1"]';
					var value = $('#blockList').find('.block').eq(blockIndex).find(inputSelector).val();
					resume.blocks[blockIndex].entries[entryIndex] = 
					{
						"key" : key,
						"value": value
					}
				}
				break;
			case 'listBlock':
				for(entryIndex=0; entryIndex < blockLength; entryIndex++){
					var inputSelector = '[name="' + "input_" + entryIndex + '"]';
					var value = $('#blockList').find('.block').eq(blockIndex).find(inputSelector).val();
					resume.blocks[blockIndex].entries[entryIndex] = 
					{
						"value": value,
					}
				}
				break;
			default:
				console.log("switch failure on block type check");
				break;
		}
	}

	var resumeJSON = JSON.stringify(resume);
	console.log(resumeJSON);

	$.post( "resumate", resumeJSON)
		.done(function( data ) {
			alert( "Data Loaded: " + data );
		});

});