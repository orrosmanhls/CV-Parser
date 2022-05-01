import mondaySdk from 'monday-sdk-js';
const monday = mondaySdk();

const parsePDF = async (pdf: File): Promise<string> => {
	const formData = new FormData();

	formData.append('pdfFile', pdf);

	const response = await fetch('/extract-text', {
		method: 'post',
		body: formData,
	});

	const data = await response.text();
	return data;
};

const createItem = async (data: any): Promise<void> => {
	const context = await monday.get('context');
	const boardId = context.data.boardIds[0];

	const itemName = data.email.split('@')[0];

	const createItemResponse = await monday.api(`mutation {
                            create_item (board_id: ${boardId}, item_name: "${itemName}") {
                                id
                            }
                        }`);

	console.log(createItemResponse);
};

export { parsePDF, createItem };
