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
};

const getColumnIdByName = async (name: string): Promise<string> => {
	const response: any = await monday.api(`query {
    boards (ids: 2614962935) {
        columns {
            title
            id
        }       
    }
}`);

	const columns: { title: string; id: string }[] =
		response.data.boards[0].columns;

	for (const column of columns) {
		if (column.title.toLowerCase().includes(name.toLocaleLowerCase())) {
			return column.id;
		}
	}

	return '';
};

const haveBeenInInterview = async (email: string): Promise<boolean> => {
	const context = await monday.get('context');
	const boardId = context.data.boardIds[0];

	const emailColumnId = await getColumnIdByName('mail');

	const response: any = await monday.api(`query {
      boards(ids: ${boardId}) {
    items {
      column_values (ids: ["${emailColumnId}"]) {
        text
      }
    }
  }

}`);

	const items: { column_values: { text: string }[] }[] =
		response.data.boards[0].items;

	for (const item of items) {
		if (item.column_values[0].text === email) {
			return true;
		}
	}

	return false;
};

export { parsePDF, createItem, haveBeenInInterview };
