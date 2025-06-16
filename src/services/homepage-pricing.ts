import { executeQuery } from '@/_lib/bigquery-helper';
import { nanoid } from 'nanoid';

const projectId = process.env.PROJECT_ID;

// Define types for the body object in insertPricingData
interface PriceDetail {
  details_id: string;
  paragraph: string;
}

interface PricingData {
  priceId: number;
  price: number;
  title: string;
  buttonText: string;
  btnUrl: string;
  viewMoreUrl: string;
  priceDetails: PriceDetail[];
}

export async function getPricingData(section: string) {


  if (section === 'pricing') {
    const query = `
 SELECT 
  pp.price_id,
  pp.price,
  pp.tittle,
  pp.button_text,
  pp.btn_url,
  pp.view_more_url,
  ARRAY_AGG(STRUCT(pd.details_id, pd.paragraph)) AS price_details
FROM 
  \`${projectId}.website_configuration.pricing_price\` AS pp
LEFT JOIN 
  \`${projectId}.website_configuration.price_details\` AS pd 
ON 
  pp.price_id = pd.price_id
GROUP BY 
  pp.price_id, pp.price, pp.tittle, pp.button_text, pp.btn_url, pp.view_more_url
  `;

    return await executeQuery({
      query,
      params: { section },
    });
  }
}

export async function insertPricingData(body: PricingData) {
  const generatedPriceId = nanoid(12);

  const insertPriceQuery = `
    INSERT INTO \`${projectId}.website_configuration.pricing_price\`
      (price_id, price, tittle, button_text, btn_url, view_more_url)
    VALUES
      (@priceId, @price, @title, @buttonText, @btnUrl, @viewMoreUrl)
  `;

  const priceParams = {
    priceId: generatedPriceId,
    price: body.price,
    title: body.title,
    buttonText: body.buttonText,
    btnUrl: body.btnUrl,
    viewMoreUrl: body.viewMoreUrl,
  };

  await executeQuery({
    query: insertPriceQuery,
    params: priceParams,
  });

  // Insert price details
  for (const detail of body.priceDetails) {
    const generatedDetailId = nanoid(12);

    const insertDetailQuery = `
      INSERT INTO \`${projectId}.website_configuration.price_details\`
        (details_id, price_id, paragraph)
      VALUES
        (@detailsId, @edits, @paragraph)
    `;

    const detailParams = {
      detailsId: generatedDetailId,
      priceId: generatedPriceId,
      paragraph: detail.paragraph,
    };

    await executeQuery({
      query: insertDetailQuery,
      params: detailParams,
    });
  }
}

export async function deletePricing(priceId: string) {
  // Delete related price details first
  const deletePriceDetailsQuery = `
      DELETE FROM \`${projectId}.website_configuration.price_details\`
      WHERE price_id = @edits
    `;

  await executeQuery({
    query: deletePriceDetailsQuery,
    params: { priceId },
  });

  // Then delete the pricing record itself
  const deletePricingQuery = `
      DELETE FROM \`${projectId}.website_configuration.pricing_price\`
      WHERE price_id = @edits
    `;

  await executeQuery({
    query: deletePricingQuery,
    params: { priceId },
  });
}


export async function updatePricing(body: PricingData, edits: string) {
  // Update pricing query
  const updatePriceQuery = `
      UPDATE \`${projectId}.website_configuration.pricing_price\`
      SET
        price = @price,
        tittle = @title,
        button_text = @buttonText,
        btn_url = @btnUrl,
        view_more_url = @viewMoreUrl
      WHERE
        price_id = @edits
    `;
  const updatePriceParams = {
    price: body.price,
    title: body.title,
    buttonText: body.buttonText,
    btnUrl: body.btnUrl,
    viewMoreUrl: body.viewMoreUrl,
    edits: edits,
  };
  // Execute update pricing query
  try {
    await executeQuery({
      query: updatePriceQuery,
      params: updatePriceParams,
    });
  } catch (error) {
    console.error('Error executing update pricing query:', error);
    throw new Error('Error updating pricing');
  }
  // First, delete all the existing price details for this price_id to replace them
  const deletePriceDetailsQuery = `
      DELETE FROM \`${projectId}.website_configuration.price_details\`
      WHERE price_id = @edits
    `;
  // Execute delete price details query
  try {
    await executeQuery({
      query: deletePriceDetailsQuery,
      params: { edits: edits }, // Ensure edits is passed as priceId
    });
  } catch (error) {
    console.error('Error deleting old price details:', error);
    throw new Error('Error deleting old price details');
  }
  // Insert or update the new price details as sent by the user in the body
  const priceDetails = body.priceDetails;
  // Insert new price details (these will overwrite the old ones)
  for (const detail of priceDetails) {
    const insertPriceDetailQuery = `
            INSERT INTO \`${projectId}.website_configuration.price_details\`
                (price_id, paragraph)
            VALUES
                (@edits, @paragraph)
        `;
    const insertPriceDetailParams = {
      edits: edits, // Link the detail to the correct price_id
      paragraph: detail.paragraph,
    };
    try {
      await executeQuery({
        query: insertPriceDetailQuery,
        params: insertPriceDetailParams,
      });
    } catch (error) {
      console.error('Error inserting new price detail:', error);
      throw new Error('Error inserting new price detail');
    }
  }
}

