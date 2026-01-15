# Legacy Assets Directory

This directory contains deprecated files that are being phased out during the reorganization process.

## Purpose

- **Temporary Storage**: Files moved here during migration for safety
- **Backward Compatibility**: Files that may still be referenced but are being replaced
- **Rollback Safety**: Backup location for files being consolidated or renamed

## Files in this directory should be:

1. **Documented**: Each file should have a comment explaining why it's here
2. **Temporary**: Files should not remain here permanently
3. **Tracked**: Keep a list of what's been moved and when
4. **Tested**: Ensure no active references before final deletion

## Migration Process

1. Move deprecated files here first
2. Update all references to new file locations
3. Test thoroughly to ensure no broken links
4. After successful testing period, delete files from this directory

## Cleanup Schedule

- **Weekly Review**: Check for files that can be safely deleted
- **Monthly Cleanup**: Remove files that have been successfully migrated
- **Final Cleanup**: Empty this directory once reorganization is complete

## Do Not Add New Files

This directory is only for files being phased out. New files should follow the established naming conventions and be placed in the appropriate directories (base/, components/, sections/, pages/, vendor/).