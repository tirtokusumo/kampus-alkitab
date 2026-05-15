import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getCmsData, saveCmsData, getDefaultCmsData, getDefaultTheme,
  updateSiteSettings as _updateSiteSettings,
  updateTheme as _updateTheme,
  updateHeaderMenus as _updateHeaderMenus,
  updateFooterMenus as _updateFooterMenus,
  addPage as _addPage,
  updatePage as _updatePage,
  deletePage as _deletePage,
  updatePageBlocks as _updatePageBlocks,
  addMedia as _addMedia,
  deleteMedia as _deleteMedia,
  applyThemeToDOM,
} from './cmsData';
import { cmsService } from '../services/api';

const CmsContext = createContext(null);

export const CmsProvider = ({ children }) => {
  const [cmsData, setCmsData] = useState(() => getCmsData());
  const [isCmsLoading, setIsCmsLoading] = useState(true);

  // Apply theme on mount and whenever it changes
  useEffect(() => {
    applyThemeToDOM(cmsData.theme);
  }, [cmsData.theme]);

  // Jembatan: Ambil data pages dari API Backend 
  useEffect(() => {
    const fetchCloudData = async () => {
      try {
        const pagesFromApi = await cmsService.getPages();
        setCmsData(prev => ({ ...prev, pages: pagesFromApi }));
      } catch (err) {
        console.error("Gagal memuat halaman dari API:", err);
      } finally {
        setIsCmsLoading(false);
      }
    };
    fetchCloudData();
  }, []);

  // Helpers — each returns updated data and sets state
  const updateSiteSettings = useCallback((updates) => {
    setCmsData(prev => _updateSiteSettings(prev, updates));
  }, []);

  const updateTheme = useCallback((themeUpdates) => {
    setCmsData(prev => _updateTheme(prev, themeUpdates));
  }, []);

  const resetTheme = useCallback(() => {
    const defaults = getDefaultTheme();
    setCmsData(prev => _updateTheme(prev, defaults));
  }, []);

  const updateHeaderMenus = useCallback((menus) => {
    setCmsData(prev => _updateHeaderMenus(prev, menus));
  }, []);

  const updateFooterMenus = useCallback((menus) => {
    setCmsData(prev => _updateFooterMenus(prev, menus));
  }, []);

  const addPage = useCallback(async (page) => {
    // Optimistic UI
    setCmsData(prev => _addPage(prev, page));
    // Ke backend
    await cmsService.createPage(page);
  }, []);

  const updatePageData = useCallback(async (pageId, updates) => {
    setCmsData(prev => _updatePage(prev, pageId, updates));
    await cmsService.updatePage(pageId, updates);
  }, []);

  const deletePageData = useCallback(async (pageId) => {
    setCmsData(prev => _deletePage(prev, pageId));
    await cmsService.deletePage(pageId);
  }, []);

  const updatePageBlocks = useCallback(async (pageId, blocks) => {
    setCmsData(prev => _updatePageBlocks(prev, pageId, blocks));
    await cmsService.updatePage(pageId, { blocks });
  }, []);

  const addMediaItem = useCallback((mediaItem) => {
    setCmsData(prev => _addMedia(prev, mediaItem));
  }, []);

  const deleteMediaItem = useCallback((mediaId) => {
    setCmsData(prev => _deleteMedia(prev, mediaId));
  }, []);

  const resetAllCms = useCallback(() => {
    const defaults = getDefaultCmsData();
    saveCmsData(defaults);
    setCmsData(defaults);
    applyThemeToDOM(defaults.theme);
  }, []);

  const value = {
    cmsData,
    siteSettings: cmsData.siteSettings,
    theme: cmsData.theme,
    headerMenus: cmsData.headerMenus,
    footerMenus: cmsData.footerMenus,
    pages: cmsData.pages,
    media: cmsData.media,
    updateSiteSettings,
    updateTheme,
    resetTheme,
    updateHeaderMenus,
    updateFooterMenus,
    addPage,
    updatePage: updatePageData,
    deletePage: deletePageData,
    updatePageBlocks,
    addMedia: addMediaItem,
    deleteMedia: deleteMediaItem,
    resetAllCms,
  };

  return (
    <CmsContext.Provider value={value}>
      {!isCmsLoading && children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error('useCms must be used within CmsProvider');
  return ctx;
};
