// src/collections/Index.ts
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'category', 'status'],
  },
  access: {
    read: () => true, // Publiekelijk leesbaar voor de webshop
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product Naam'
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug (bijv: zwarte-elegante-abaya)'
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Product Beschrijving'
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Korte Beschrijving'
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      label: 'Prijs (€)'
    },
    {
      name: 'salePrice',
      type: 'number',
      min: 0,
      label: 'Sale Prijs (€)'
    },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          label: 'Alt tekst voor afbeelding'
        }
      ]
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Categorie'
    },
    {
      name: 'sizes',
      type: 'array',
      label: 'Beschikbare Maten',
      fields: [
        {
          name: 'size',
          type: 'select',
          options: [
            { label: 'Extra Small (XS)', value: 'XS' },
            { label: 'Small (S)', value: 'S' },
            { label: 'Medium (M)', value: 'M' },
            { label: 'Large (L)', value: 'L' },
            { label: 'Extra Large (XL)', value: 'XL' },
            { label: 'XXL', value: 'XXL' },
            { label: 'XXXL', value: 'XXXL' }
          ],
          required: true
        },
        {
          name: 'stock',
          type: 'number',
          min: 0,
          defaultValue: 0,
          label: 'Voorraad'
        }
      ]
    },
    {
      name: 'colors',
      type: 'array',
      label: 'Beschikbare Kleuren',
      fields: [
        {
          name: 'colorName',
          type: 'text',
          required: true,
          label: 'Kleur Naam (bijv: Diep Zwart)'
        },
        {
          name: 'colorCode',
          type: 'text',
          label: 'Hex Color Code (bijv: #000000)'
        }
      ]
    },
    {
      name: 'fabric',
      type: 'select',
      label: 'Stof Type',
      options: [
        { label: 'Crepe', value: 'crepe' },
        { label: 'Chiffon', value: 'chiffon' },
        { label: 'Jersey', value: 'jersey' },
        { label: 'Satijn', value: 'satijn' },
        { label: 'Katoen', value: 'katoen' },
        { label: 'Polyester', value: 'polyester' }
      ]
    },
    {
      name: 'features',
      type: 'array',
      label: 'Product Kenmerken',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true
        }
      ]
    },
    {
      name: 'careInstructions',
      type: 'textarea',
      label: 'Verzorgingsinstructies'
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Gewicht (gram) - voor verzendkosten'
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Actief', value: 'active' },
        { label: 'Concept', value: 'draft' },
        { label: 'Uitverkocht', value: 'sold-out' },
        { label: 'Niet meer leverbaar', value: 'discontinued' }
      ],
      defaultValue: 'active',
      required: true
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Product (tonen op homepage)',
      defaultValue: false
    },
    {
      name: 'newArrival',
      type: 'checkbox',
      label: 'Nieuwe Collectie',
      defaultValue: false
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags (bijv: elegant, casual, feest)',
      fields: [
        {
          name: 'tag',
          type: 'text'
        }
      ]
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Instellingen',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'SEO Title'
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description'
        }
      ]
    }
  ]
}

export default Products
