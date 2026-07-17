-- Migration: add logo_url column to site_settings
-- Run this in Supabase SQL Editor (təhlükəsizdir, təkrar işlədilə bilər)

ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS logo_url TEXT;
